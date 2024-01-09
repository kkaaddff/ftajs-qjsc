{
    "targets": [
        {
            "target_name": "qjsc",
            "sources": [
                "src/cpp/qjs_2020_07_05.cc",
                "deps/quickjs_2020_07_05/cutils.c",
                "deps/quickjs_2020_07_05/cutils.h",
                "deps/quickjs_2020_07_05/libregexp.c",
                "deps/quickjs_2020_07_05/libregexp.h",
                "deps/quickjs_2020_07_05/libregexp-opcode.h",
                "deps/quickjs_2020_07_05/libunicode.c",
                "deps/quickjs_2020_07_05/libunicode.h",
                "deps/quickjs_2020_07_05/libunicode-table.h",
                "deps/quickjs_2020_07_05/list.h",
                "deps/quickjs_2020_07_05/quickjs.c",
                "deps/quickjs_2020_07_05/quickjs-libc.c",
                "deps/quickjs_2020_07_05/libbf.c",
                "deps/quickjs_2020_07_05/quickjs.h",
                "deps/quickjs_2020_07_05/quickjs-atom.h",
                "deps/quickjs_2020_07_05/quickjs-opcode.h",
            ],
            'include_dirs': [
                "<!(node -p \"require('node-addon-api').include_dir\")",
            ],
            "defines": [
                'CONFIG_VERSION=\"2020-07-05\"',
                'CONFIG_BIGNUM=\"y\"'
            ],
            'cflags!': ['-fexceptions'],
            'cflags_cc!': ['-fexceptions', ],
            'cflags': ['-Wno-sign-compare'],
            'conditions': [
                ["OS=='win'", {
                    "defines": [
                        "_HAS_EXCEPTIONS=1"
                    ],
                    "msvs_settings": {
                        "VCCLCompilerTool": {
                            "ExceptionHandling": 1
                        },
                    },
                }],
                ["OS=='linux'", {
                    'cflags_cc': ['-fvisibility=hidden'],
                    "defines": [
                        "NAPI_DISABLE_CPP_EXCEPTIONS"
                    ],
                }],
                ["OS=='mac'", {
                    'cflags_cc': ['-fvisibility=hidden'],
                    'xcode_settings': {
                        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
                        'CLANG_CXX_LIBRARY': 'libc++',
                        'MACOSX_DEPLOYMENT_TARGET': '10.7',
                        'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',
                        "OTHER_CFLAGS": ['-Wno-sign-compare'],
                    },
                }],
            ],
        },
        # {
        #     "target_name": "qjsc",
        #     "sources": [
        #         "src/cpp/qjs_2021_03_27.cc",
        #         "deps/quickjs_2021_03_27/cutils.c",
        #         "deps/quickjs_2021_03_27/cutils.h",
        #         "deps/quickjs_2021_03_27/libregexp.c",
        #         "deps/quickjs_2021_03_27/libregexp.h",
        #         "deps/quickjs_2021_03_27/libregexp-opcode.h",
        #         "deps/quickjs_2021_03_27/libunicode.c",
        #         "deps/quickjs_2021_03_27/libunicode.h",
        #         "deps/quickjs_2021_03_27/libunicode-table.h",
        #         "deps/quickjs_2021_03_27/list.h",
        #         "deps/quickjs_2021_03_27/quickjs.c",
        #         "deps/quickjs_2021_03_27/quickjs-libc.c",
        #         "deps/quickjs_2021_03_27/libbf.c",
        #         "deps/quickjs_2021_03_27/quickjs-debugger.h",
        #         "deps/quickjs_2021_03_27/quickjs-debugger.c",
        #         "deps/quickjs_2021_03_27/quickjs-debugger-transport-unix.c",
        #         "deps/quickjs_2021_03_27/quickjs.h",
        #         "deps/quickjs_2021_03_27/quickjs-atom.h",
        #         "deps/quickjs_2021_03_27/quickjs-opcode.h",
        #     ],
        #     'include_dirs': [
        #         "<!(node -p \"require('node-addon-api').include_dir\")",
        #     ],
        #     "defines": [
        #         'CONFIG_VERSION=\"2021-03-27-debugger\"',
        #         'CONFIG_BIGNUM=\"y\"'
        #     ],
        #     'cflags!': ['-fexceptions'],
        #     'cflags_cc!': ['-fexceptions', ],
        #     'cflags': ['-Wno-sign-compare'],
        #     'conditions': [
        #         ["OS=='win'", {
        #             "defines": [
        #                 "_HAS_EXCEPTIONS=1"
        #             ],
        #             "msvs_settings": {
        #                 "VCCLCompilerTool": {
        #                     "ExceptionHandling": 1
        #                 },
        #             },
        #         }],
        #         ["OS=='linux'", {
        #             'cflags_cc': ['-fvisibility=hidden'],
        #             "defines": [
        #                 "NAPI_DISABLE_CPP_EXCEPTIONS"
        #             ],
        #         }],
        #         ["OS=='mac'", {
        #             'cflags_cc': ['-fvisibility=hidden'],
        #             'xcode_settings': {
        #                 'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        #                 'CLANG_CXX_LIBRARY': 'libc++',
        #                 'MACOSX_DEPLOYMENT_TARGET': '10.7',
        #                 'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',
        #                 "OTHER_CFLAGS": ['-Wno-sign-compare'],
        #             },
        #         }],
        #     ],
        # }
    ]
}
