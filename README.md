# sushi-buffet README

all-you-can-eat Sushi while you are coding on VS Code.

## Features

お寿司が好きな IT エンジニアのための拡張機能です。
設定を有効にすると、VS Code の新しいウィンドウを立ち上げたときに寿司が流れます。

Windows 10 で動作確認済、Mac は未確認です。ご容赦ください。

VS Code の画面を構成する`workbench.main.css`を直接編集するため、
拡張機能が有効状態だと次のような警告が表示されます。

* タイトルバーに \[サポート対象外] の表示
* 「VS Code が壊れている可能性があります。」のエラーメッセージ

動作には特に影響はありませんが、気になる方はご利用をお控えください。

また、最初の拡張機能有効時に`workbench.main.css`をコピーした`workbench.main.css.backup`を生成します。
万が一環境を汚してしまった場合は、`workbench.main.css`ファイルを削除し、
`workbench.main.css.backup`を利用してください（`.backup`の拡張子は消してください。）。

### Uninstall

アンインストール後、\[サポート対象外]の表示や上記エラーメッセージが消えない場合は、次をお試しください。

* `workbench.main.css`を開いていただき、最後の改行を消す
* または、`workbench.main.css.backup`に置き換える

VS Code を再起動すれば表記がなくなります。

## Extension Settings

設定画面から "Sushi Buffet Preferences" を検索すると、次の設定項目があります。
設定を変更した場合、次の VS Code ウィンドウの立ち上げ時から有効になります。

* `sushiBuffet.enable`: 壁紙にお寿司を設定します。
* `sushiBuffet.opacity`: お寿司の透過率を設定します。0.1 ~ 1の範囲で設定してください。

## Command

* `extension.reset`: `workbench.main.css`の記述をリセットします。

なお、`sushiBuffet.enable`が無効になっている場合、拡張機能が非アクティブ化（ウィンドウを閉じる等）するたびに
`workbench.main.css`の記述を元の状態に戻しています。

そのため、このコマンド自体はあまり意味はありません。。。

## Release Notes

### 1.0.0

Initial release

## Connect

* Twitter: @kcpoipoi
* Gmail: kcs.dev.labo@gmail.com