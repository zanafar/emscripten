// Copyright 2019 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

LibraryManager.library = {
  fd_prestat_get: function(fd, buf) {
    return {{{ __WASI_EBADF }}};
    assert(fd === 3); // the wasi API docs don't seem to mention what this means
    HEAP32[buf >> 2] = {{{ __WASI_PREOPENTYPE_DIR }}};
    HEAP32[buf + 4 >> 2] = 1; // name len
    return 0;
  },
  fd_prestat_dir_name: function(fd, path, path_len) {
    return {{{ __WASI_EBADF }}};
    assert(fd === 3);
    if (path_len > 0) HEAP8[path] = 65;
    if (path_len > 1) HEAP8[path + 1] = 0;
    return 0;
  },
  fd_fdstat_get: function(fd, buf) {
    return {{{ __WASI_EBADF }}};
  },
  fd_write: function(fd, iovs, iovs_len, nwritten) {
    assert(fd === {{{ WASI_STDOUT_FILENO }}});
    var total = 0;
    console.log(iovs, iovs_len);
    for (var i = 0; i < iovs_len; i++) {
      var ptr = {{{ makeGetValue('iovs', 'i*8', 'i32') }}};
      var len = {{{ makeGetValue('iovs', 'i*8 + 4', 'i32') }}};
      console.log(ptr, len);
      for (var j = 0; j < len; j++) {
        console.log(HEAPU8[ptr + j]);
      }
      total += len;
    }
    HEAP32[nwritten >> 2] = total;
    return 0;
  },
  environ_sizes_get: function(environ_count, environ_buf_size) {
    HEAP32[environ_count >> 2] = 0;
    HEAP32[environ_buf_size >> 2] = 0;
    return 0;
  },
  args_sizes_get: function(argc, argv_buf_size) {
    HEAP32[argc >> 2] = 0;
    HEAP32[argv_buf_size >> 2] = 0;
    return 0;
  },
};

