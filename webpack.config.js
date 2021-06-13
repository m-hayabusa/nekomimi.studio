const path = require("path");

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development", // "production" | "development" | "none"

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        index: "./ts/index.ts",
        music: "./ts/music.ts",
        notify: "./ts/notify.ts",
    },

    output: {
        path: path.join(__dirname, "built"),
        filename: "[name].js",
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.ttf|\.woff2?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.png/,
                use: "url-loader",
            }
        ],
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        modules: [
            "node_modules", // node_modules 内も対象とする
        ],
        extensions: [
            ".ts",
            ".js", // node_modulesのライブラリ読み込みに必要
        ],
    },
};
