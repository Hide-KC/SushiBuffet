# sushi-buffet README

Enjoy Kaiten-Sushi while you are coding on VS Code.

## Features

お寿司が好きな IT エンジニアのための拡張機能です。
設定を有効にすると、VS Code で回転寿司が楽しめます。

![demo](kaiten_sushi_release.gif)

寿司ネタは VS Code 立ち上げ時にランダムで選択されます。

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

* `workbench.main.css`を開き、最終行の改行を消す
* または、`workbench.main.css.backup`に置き換える

VS Code を再起動すれば表記がなくなります。

## Extension Settings

設定画面から "Sushi Buffet Preferences" を検索すると、次の設定項目があります。
設定を変更した場合、次の VS Code ウィンドウの立ち上げ時から有効になります。

* `SushiBuffetPreferences.enable`: 壁紙に回転寿司を設定します。
* `SushiBuffetPreferences.opacity`: お寿司の透過率を設定します。0.1 ~ 1の範囲で設定してください。

`enable`をオンにすると`workbench.main.css`に構文を書き込み、
オフにすると書き込んだ構文を削除します。

## Command

コマンドは特にありません。

## Release Notes

### 2.0.0

「これ流れ寿司ですよね？回転寿司じゃないですよね？？」

という指摘をもらったので回転寿司に改良しました。

### 1.0.0

Initial release

## Contact

* Twitter: @kcpoipoi
* Gmail: kcs.dev.labo@gmail.com