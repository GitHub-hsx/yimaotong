

/**
*
* @param {协议名} protocol
* @param {类型} type
* @param {数据} envelop
*/
// export function dispatchMessage(protocol, type, envelop) {
//  const src = `${protocol}://${type}/${envelop.id}?+${encodeURIComponent(JSON.stringify(envelop))}`;
//  let iframe = document.createElement('iframe');
//  iframe.setAttribute('src', src);
//  document.documentElement.appendChild(iframe);
//  iframe.parentNode.removeChild(iframe);
//  iframe = null;
// }



// 客户端调用协议定义
(function () {

	// Non-accessible variable to send to the app, to ensure events only
	// come from the desired host.
	var host = window.location.host;
	var hash = window.location.hash;
	// alert(JSON.stringify(hash));

	var nativeDispatcher = {
			callbacks: {},

			send: function(envelope, complete) {
					this.dispatchMessage("event", envelope, complete);
			},

			sendCallback: function(messageId) {
					var envelope = Jockey.createEnvelope(messageId);

					this.dispatchMessage("callback", envelope, function() {});
			},

			triggerCallback: function(id, json) {
					var dispatcher = this;

					// Alerts within JS callbacks will sometimes freeze the iOS app.
					// Let's wrap the callback in a timeout to prevent this.
					setTimeout(function() {
							dispatcher.callbacks[id](json);
					}, 0);
			},

			// `type` can either be "event" or "callback"
			dispatchMessage: function(type, envelope, complete) {
				// We send the message by navigating the browser to a special URL.
				// The iOS library will catch the navigation, prevent the UIWebView
				// from continuing, and use the data in the URL to execute code
				// within the iOS app.

				var dispatcher = this;

				this.callbacks[envelope.id] = function(json) {
						complete(json);

						delete dispatcher.callbacks[envelope.id];
				};

				var src = "yimaotong://" + type + "/" + envelope.id + "?" + encodeURIComponent(JSON.stringify(envelope));
				var iframe = document.createElement("iframe");
				iframe.setAttribute("src", src);
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			}
};

	// var IframeDispatcher = {

	// 		callbacks: {},

	// 		send: function(envelope, complete) {
	// 				this.dispatchMessage("jinzhouEvent", envelope, complete);
	// 		},

	// 		sendCallback: function(messageId) {
	// 				var envelope = Jockey.createEnvelope(messageId);

	// 				this.dispatchMessage("jinzhouCallback", envelope, function() {});
	// 		},

	// 		triggerCallback: function(id, json) {
	// 				if (this.callbacks[id]) {
	// 						this.callbacks[id](json);
	// 				}
	// 		},

	// 		// `type` can either be "jinzhouEvent" or "jinzhouCallback"
	// 		dispatchMessage: function(type, envelope, complete) {
	// 				var dispatcher = this;

	// 				this.callbacks[envelope.id] = function(json) {
	// 						complete(json);

	// 						delete dispatcher.callbacks[envelope.id];
	// 				};

	// 				Jockey.targetWindow.postMessage({ type: type, envelope: envelope }, Jockey.targetDomain);
	// 		}
	// };

	var Jockey = {
			listeners: {
			},

			dispatchers: [],

			messageCount: 0,

			targetDomain: '*',

			targetWindow: window.parent,

			on: function(type, fn) {
					if (!this.listeners.hasOwnProperty(type) || !this.listeners[type] instanceof Array) {
							this.listeners[type] = [];
					}

					this.listeners[type].push(fn);
			},

			off: function(type) {
					if (!this.listeners.hasOwnProperty(type) || !this.listeners[type] instanceof Array) {
							this.listeners[type] = [];
					}

					this.listeners[type] = [];
			},

			send: function(type, payload, complete) {
					if (payload instanceof Function) {
							complete = payload;
							payload = null;
					}

					payload = payload || {};
					complete = complete || function() {};

					var envelope = this.createEnvelope(this.messageCount, type, payload);

					this.dispatchers.forEach(function(dispatcher) {
							dispatcher.send(envelope, complete);
					});

					this.messageCount += 1;
			},

			// Called by the native application when events are sent to JS from the app.
			// Will execute every function, FIFO order, that was attached to this event type.
			trigger: function(type, messageId, json) {
					var self = this;

					var listenerList = this.listeners[type] || [];

					var executedCount = 0;

					var complete = function() {
							executedCount += 1;

							if (executedCount >= listenerList.length) {
									self.dispatchers.forEach(function(dispatcher) {
											dispatcher.sendCallback(messageId);
									});
							}
					};

					for (var index = 0; index < listenerList.length; index++) {
							var listener = listenerList[index];
							// If it's a "sync" listener, we'll call the complete() function
							// after it has finished. If it's async, we expect it to call complete().
							if (listener.length <= 1) {
									listener(json);
									complete();
							} else {
									listener(json, complete);
							}
					}

			},
			// Called by the native application in response to an event sent to it.
			// This will trigger the callback passed to the send() function for
			// a given message.
			triggerCallback: function(id, json) {
					this.dispatchers.forEach(function(dispatcher) {
							dispatcher.triggerCallback(id, json);
					});
			},

			restrictIframeDispatcher: function(targetDomain, targetWindow) {
					this.targetDomain = targetDomain;
					this.targetWindow = targetWindow;
			},

			// Handles postMessage events when iframeDispatcher is used
			onMessageRecieved: function(event) {
					if (this.targetDomain != '*' && this.targetDomain != event.origin) {
							return;
					}

					var envelope = event.data.envelope;
					if (event.data.type == "jinzhouEvent") {
							this.trigger(envelope.type, envelope.id, envelope.payload);
					} else if (event.data.type == "jinzhouCallback") {
							this.triggerCallback(event.data.envelope.id);
					}
			},

			createEnvelope: function(id, type, payload) {
					var host = window.location.host;
					var hash = window.location.hash;
					return {
							id: id,
							type: type,
							host: host,
							hash: hash,
							payload: payload
					};
			}
	};

	// Dispatcher detection. Currently only supports iOS.
	// Looking for equivalent Android implementation.
	var i = 0,
			iOS = false,
			iDevice = ['iPad', 'iPhone', 'iPod'];

	for (; i < iDevice.length; i++) {
			if (navigator.platform.indexOf(iDevice[i]) >= 0) {
					iOS = true;
					break;
			}
	}

	// Detect UIWebview. In Mobile Safari proper, jockey urls cause a popup to
	// be shown that says "Safari cannot open page because the URL is invalid."
	// From here: http://stackoverflow.com/questions/4460205/detect-ipad-iphone-webview-via-javascript

	var UIWebView  = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
	var isAndroid  = navigator.userAgent.toLowerCase().indexOf("android") > -1;

	if ((iOS && UIWebView) || isAndroid) {
			Jockey.dispatchers.push(nativeDispatcher);
	}

	// Jockey.dispatchers.push(IframeDispatcher);
	window.addEventListener("message", Jockey.onMessageRecieved.bind(Jockey), false);

	window.Jockey = Jockey;
})();
