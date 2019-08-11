/**
 * 构造请求体
 * body 请求体
 */
export default function createRequestBody(body, head = {}, message = {}, token = '') {
  const seq = head.seq || (body.head && body.head.seq) || '10000';
  return {
    head: {
      // ...body.head,
      deviceId: head.deviceId || (body.head && body.head.deviceId) || '',
      deviceType: head.deviceType || (body.head && body.head.deviceType) || 'phone',
      softVersion: head.softVersion || (body.head && body.head.softVersion) || '1.8.9',
      seq: head.seq || seq || '10000',
      osType: head.osType || (body.head && body.head.osType) || 'android',
      type: head.type || (body.head && body.head.type) || '',
    },
    message: message || body.message,
    token: token || body.token,
  };
}