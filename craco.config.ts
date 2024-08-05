// git test
import path from 'path';

const SRC_PATH = path.resolve(__dirname, 'src');

export default {
  webpack: {
    alias: {
      '@': path.resolve(SRC_PATH),
    },
  },
};