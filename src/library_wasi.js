// Copyright 2019 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

LibraryManager.library = {
  fd_prestat_get: function(fd, buf) {
    console.log('waka ' + [fd, buf]);
    HEAP32[buf >> 2] = {{{ __WASI_PREOPENTYPE_DIR }}};
    HEAP32[buf + 4 >> 2] = 0; // name len
    return 0;
  },
};

