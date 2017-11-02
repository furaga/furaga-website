/**
 *
 * ProductionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProductionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Item from './Item';
import styled from 'styled-components';

const H1 = styled.h1`
color: #41ADDD;
`;

const productionsInfo = [
  {
    title: "Inspector2D",
    language: "Visual C# 2013",
    date: "2014年1月14日",
    repository: "https://github.com/furaga/Inspector2D",
    image: "https://imgur.com/JEMuWLI.png",
    video: "",
    download: "",
    description: <div>デバッグ実行時にBitmapやPoint型のリストなどを二次元キャンバス上に可視化するVisual Studio拡張機能．イメージ的にはクイックウォッチの二次元画像版．</div>
  }, 
  {
    title: "MethodRerunner",
    language: "Visual C# 2013",
    date: "2014年12月上旬",
    repository: "https://github.com/furaga/MethodRerunner",
    image: "",
    video: "https://www.youtube.com/embed/BGdnBHPWdS8",
    download: "",
    description: <div>実行時に関数の引数を保存して、実行後に復元して単体テストなどに利用できるVisual Studio拡張機能．<br/>
        下のビデオを見ると雰囲気はわかると思う．個人的に欲しかったので作った．</div>
  }, {
    title: "InstantDisplayTranslation",
    language: "Visual C# 2010",
    date: "2014年7月19日",
    repository: "https://github.com/furaga/InstantDisplayTranslation",
    image: "https://imgur.com/1n1EkO3.png",
    video: "",
    download: "http://furaga.sakura.ne.jp/publish/InstantDisplayTranslation.zip",
    description: <div>デュアルディスプレイをしているときに簡単にディスプレイの位置関係を変えるツール．<br/>
        <br/>
        <b>使い方</b><br/>
        1) 一方のスクリーンの角あるいは辺の周辺にマウスカーソルを移動する．<br/>
        2) ショートカットキー（デフォルトはF1)を押す．すると現在マウスカーソルのある方角にもう一方スクリーンが移動する．<br/>
        <br/>
        例えばスクリーン1の右端にマウスカーソルを動かしてF1を押すと，スクリーン2がスクリーン1の右側に配置されます．<br/>
        <br/>
        <b>仕組み</b><br/>
        仮想的なディスプレイの配置（画面右側のVirtual screen
        arrangement）を考え，マウスカーソルがスクリーンの端にきたら仮想空間における適切な位置にマウスを瞬間移動しています．
        <br/>
        実際にWindowsのディスプレイの設定をいじっているわけではありません．<br/>
        <br/></div>
  }, {
    title: "SketchTyping",
    language: "Visual C# 2010",
    date: "2014年2月中旬",
    download: "http://furaga.sakura.ne.jp/publish/SketchTyping.zip",
    repository: "https://github.com/furaga/SketchTyping",
    image: "https://imgur.com/932csbz.png",
    video: "",
    description: <div>
        <p>動画: ”キーボードで文字を「描く」ソフト作ってみた”.
          <a href="http://www.nicovideo.jp/watch/sm22941346">ニコニコ動画</a>
          <a href="http://www.youtube.com/watch?v=RLiCVVRPKjw">youtube</a>
        </p>
        キーボードをなぞることによる入力システム。<br/>
        ユーザがキーボードをなぞると、システムはキーが押された順番を手がかりにユーザの指がどう動いたかを推定します。<br/>
        その後手書き認識でユーザが描いた文字（記号）を識別し、事前に設定しておいたアクションを発火します。<br/>
        上記の動画を見れば雰囲気はわかると思います。<br/>
        <br/>
        実行ファイルに同梱しているのは以下の３つのソフトウェア。<br/>
        <br/>
        1)
        <b>TextInput.exe</b>: "Σ", "π", "∫"などの文字を入力するデモ。<br/>
        2)
        <b>Browser.exe</b>: Webブラウザの操作。ブラウザ上で左右にキーボードをなぞるとページ移動。右斜上方向になぞるとタブを閉じる。円を描くとページ更新。<br/>
        3)
        <b>SketchTypingDataCollect</b>: 各ジェスチャの設定ツール。TextInput.exe, Browser.exeの”edit”ボタンを押すとこれが起動します。<br/>
        <br/>
        動画に登場するその他のデモ（パワポの図形作成など）は環境依存しすぎるので公開しません。<br/>
        どうしても欲しい方はgithubのソースコードをがんばってビルドしてください。<br/></div>
  }, {
    title: "スペクトラムアナライザ",
    language: "Visual C# 2010",
    date: "2014年6月30日",
    repository: "https://github.com/furaga/SpectrumAnalyzer",
    image: "https://imgur.com/dJ3l27I.png",
    video: "",
    download: "http://furaga.sakura.ne.jp/publish/SpectrumAnalyzer.zip",
    description: <div>
        <p>簡易的なスペクトラムアナライザ。C#でのシンプルな実装がなかったので作った。</p>
      </div>
  }, {
    title: "すくすく",
    language: "Visual C# 2010",
    date: "2012年4月中旬から５月中旬",
    download: "http://furaga.sakura.ne.jp/publish/SukuSuku.zip",
    repository: "https://github.com/furaga/SukuSuku",
    image: "https://imgur.com/3dS15x1.png",
    video: "",
    description: <div>
        <p>スクリーンショットを用いたRubyスクリプトエンジン（IDE)。<a href="http://sikuli.org/">Sikuli IDE</a>の真似事。</p>
        <p>OpenCVとRubyが合わさることで最強に見える</p>
        <p>
          <a
            href="http://www.microsoft.com/downloads/ja-jp/details.aspx?familyid=9cfb2d51-5ff4-4491-b0e5-b386f32c0992">NET4.0以上のランタイム</a>があれば動くと思います</p>
      </div>
  }, {
    title: "リッタイver3",
    language: "Visual C# 2010（XNA4.0）",
    date: "2011年３月ごろの約3週間",
    download: "http://furaga.sakura.ne.jp/publish/Rittai3rd.zip",
    repository: "https://github.com/furaga/Rittai3rd",
    image: "https://imgur.com/z9EpIPu.png",
    video: "",
    description: <div>
        <p>スマブラっぽい対戦アクションゲーム。キャラは立方体と球。おいしそうな色してます。</p>
        <p>ver1とver2は星になって僕らを見守ってくれています。</p>
        <p>Windows Vista, Windows 7（64bit）で動作を確認しました。.NET4.0以上、XNA4.0以上のランタイムがあれば動くと思います。</p>
      </div>
  }, {
    title: "ライフゲーム",
    language: "Visual C++ 2008(DXライブラリ) + Squirrel",
    date: "2010年4月はじめ。所要期間１日",
    download: "http://furaga.sakura.ne.jp/publish/lifegame.zip",
    repository: "",
    image: "https://imgur.com/20phfBm.png",
    video: "",
    description: <div>ライフゲーム。Squirrelを使ってみたかった</div>
  }, {
    title: "自作マインスイーパ",
    language: "VC++ 2008(DXライブラリ)",
    date: "2010年2月くらいの約３日間",
    download: "http://furaga.sakura.ne.jp/publish/minesweeper.zip",
    repository: "",
    image: "https://imgur.com/ank5QMW.png",
    video: "",
    description: <div><p>ただのマインスイーパ。オブジェクト指向をよくわかってなかった時期のプログラム。かなり気持ち悪いコードになってる</p></div>
  }, {
    title: "テトリス",
    language: "VC++ 2008(DXライブラリ) → VC++2010(DXライブラリ)でコンパイルし直しました",
    date: "2009年12月くらい",
    download: "http://furaga.sakura.ne.jp/publish/simpleTetris.zip",
    repository: "https://github.com/furaga/simpleTetris",
    image: "https://imgur.com/jP906MA.png",
    video: "",
    description: <div>ただのテトリス</div>
  }, {
    title: "ルービックキューブ",
    language: "C++(DXライブラリ)",
    date: "2009年9月くらいの2週間～3週間？",
    download: "http://furaga.sakura.ne.jp/publish/rubiccube.zip",
    repository: "",
    image: "https://imgur.com/C1riLvN.png",
    video: "",
    description: <div><p>はじめて作ったゲーム。マウスで操作してルービックキューブを解くゲーム。UIがとてもわるい。</p></div>
  }
]

const ItemList = styled.div `
display:flex;
flex-flow: row wrap;
align-items: flex-start;
`;

export class ProductionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Productions</title>
          <meta name="description" content="Description of ProductionPage"/>
        </Helmet>

        <H1>furagaのプロダクト置き場</H1>

        <ItemList>
          {productionsInfo.map((info) => <Item info={info}/>)}
        </ItemList>
      </div>
    );
  }
}

ProductionPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({productionpage: makeSelectProductionPage()});

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'productionPage', reducer});
const withSaga = injectSaga({key: 'productionPage', saga});

export default compose(withReducer, withSaga, withConnect,)(ProductionPage);
