export default () => process.env.NODE_ENV === 'production' ? io.connect() : io.connect('http://192.168.1.19:3001');
