import React from 'react';
import { isCallChain, isPropertySignature, NumericLiteral } from 'typescript';
import './App.css';

// アプリケーション内で共通的に使用する型の定義
type FeeClassification = {
    name: string;
    desription: string;
    unitPrice: number;
    numOfPeople: number;
    totalPrice: number;
}

// type DetailState = {
//     numOfPeople: number;
// }


// Detailで使用するprops の型定義
type DetailProps = {
    classification: FeeClassification;

    // onNumOfPeopleChange 型定義？？？
    onNumOfPeopleChange: (num: number) => void;
}

// 入力用の明細
// React.Componentはpropsの方とStateの型をパラメータとして受け取る
class Detail_old extends React.Component<DetailProps, {}> {
    // コンストラクタでstateを初期化
    constructor(props: DetailProps) {
        super(props);
        this.state = {
            numOfPeople: props.classification.numOfPeople,
        }
    }

    // 人数が変わったときに 呼び出される関数
    onNumOfPeopleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        // 新しくnumのオブジェクトを作成して、 setStateで更新
        const num: number = Number(e.target.value);

        this.props.onNumOfPeopleChange(num);
        // リフトアップしたので setState
        // this.setState({
        //     numOfPeople: num,
        // });
    }

    render() {
        //rener method
        // classは予約語なので classnameとしよう
        // 最上位の要素は一つ(div)
        return (
            <div >
                {/* 親コンポーネントから渡されたpropsをthis.propsで参照する
                {}で囲まれた範囲はtypescriptの範囲として扱われる*/}
                <div className="classification-name">{this.props.classification.name}</div>
                <div className="description">{this.props.classification.desription}</div>
                <div className="unit-price">{this.props.classification.unitPrice}円</div>
                <div className="num-people">
                    <select value={this.props.classification.numOfPeople} onChange={e => this.onNumOfPeopleChange(e)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>名</span>
                </div>
            </div>
        );
    }
}


// リファクタリング DetailとSummeryコンポーネントはなんのstateを管理していないので、関数としてコンポーネントを定義
const Detail: React.FC<DetailProps> = props => {
    const onNumOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const num: number = Number(e.target.value);
        props.onNumOfPeopleChange(num);
    }

    //rener method
    // classは予約語なので classnameとしよう
    // 最上位の要素は一つ(div)
    return (
        <div >
            {/* 親コンポーネントから渡されたpropsをthis.propsで参照する
                {}で囲まれた範囲はtypescriptの範囲として扱われる*/}
            <div className="classification-name">{props.classification.name}</div>
            <div className="description">{props.classification.desription}</div>
            <div className="unit-price">{props.classification.unitPrice}円</div>
            <div className="num-people">
                <select value={props.classification.numOfPeople} onChange={e => onNumOfPeopleChange(e)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <span>名</span>
            </div>
        </div>
    );


}

// sumを更新する
type SummaryProps = {
    numOfPeople: number;
    totalAmount: number;
}
// 合計を表示
class Summary_old extends React.Component<SummaryProps, {}>{
    render() {
        return (
            <div>
                <div className="party">
                    <input type="text" className="party" value={this.props.numOfPeople} />
                    <span>名様</span>
                </div>
                <div className="total-amount">
                    <span>合計</span>
                    <input type="text" className="total-amount" value={this.props.totalAmount} />
                    <span>円</span>
                </div>
            </div>
        );
    }
}

const Summary: React.FC<SummaryProps> = props => {
    return (
        <div>
            <div className='party'>
                <input type="text" className='party' value={props.numOfPeople} />
                <span>名様</span>

            </div>
            <div className='total-amount'>
                <span>合計</span>
                <input type="text" className='total-amount' value={props.totalAmount} />
                <span>円</span>
            </div>
        </div>
    );
}

type AdmissionFeeCalculatorState = {
    feeClassifications: FeeClassification[];
}


// 明細 合計をまとめたもの
class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
    // 繰り返し表示するデータを準備
    // private detail: DetailProps[] = [
    //     {
    //         classification: {
    //             name: "大人",
    //             desription: "",
    //             unitPrice: 1000,
    //             numOfPeople: 0,
    //             totalPrice: 0
    //         }
    //     },
    //     {
    //         classification: {
    //             name: "学生",
    //             desription: "中学生・高校生",
    //             unitPrice: 700,

    //             totalPrice: 0
    //         }
    //     },
    //     {
    //         classification: {
    //             name: "子ども",
    //             desription: "小学生",
    //             unitPrice: 300,
    //             numOfPeople: 0,
    //             totalPrice: 0
    //         }
    //     },
    //     {
    //         classification: {
    //             name: "幼児",
    //             desription: "未就学",
    //             unitPrice: 0,
    //             numOfPeople: 0,
    //             totalPrice: 0
    //         }
    //     },
    // ];

    constructor(props: {}) {
        super(props);
        const adults: FeeClassification = {
            name: "大人 ",
            desription: "",
            unitPrice: 1000,
            numOfPeople: 0,
            totalPrice: 0,
        };
        const student: FeeClassification = {
            name: "学生",
            desription: "中学生・高校生",
            unitPrice: 700,
            numOfPeople: 0,
            totalPrice: 0,
        };
        const children: FeeClassification = {
            name: "子供",
            desription: "小学生",
            unitPrice: 300,
            numOfPeople: 0,
            totalPrice: 0,
        };
        const infants: FeeClassification = {
            name: "幼児",
            desription: "未就学",
            unitPrice: 0,
            numOfPeople: 0,
            totalPrice: 0,
        };
        this.state = { feeClassifications: [adults, student, children, infants] };
    }

    // adults, studentなどのindexを受け取って、 そのfeeClassificationsのtotalPriceを更新する
    handleNumOfPeopleChange(idx: number, num: number) {
        // 現在のstateを保存
        const currentFC = this.state.feeClassifications[idx];
        // 新しい金額の計算
        const newTotalPrice = currentFC.unitPrice * num;

        //人数と合計値以外は 既存の値をコピー
        //assign は 列挙可能な自身のプロパティの値をコピー元オブジェクトから コピー先にコピー
        // Object.assign(target, ...sources)
        // コピー先オブジェクト: target
        // コピー元オブジェクト(複数): sources
        const newFC: FeeClassification = Object.assign({}, currentFC, { numOfPeople: num, totalPrice: newTotalPrice });

        // slice は startとendを指定して 新しい配列を作成 何も指定しない場合は全部
        const feeClassifications = this.state.feeClassifications.slice();
        feeClassifications[idx] = newFC;

        // stateの更新
        this.setState({ feeClassifications: feeClassifications });

    }

    render() {
        // 複数行のdetailを返す jsxを作成
        // map を使って jsxの配列へ変換

        // const detailsJsx = this.detail.map((fc, idx) => {
        //     return (
        //         // 繰り返し表示するコンポーネントに対してはkey属性を付与する必要がある
        //         // 変更が入ったときに、どこに変更が入ったかを区別するため
        //         <Detail key={idx.toString()} classification={fc.classification} />
        //     );
        // });

        // return (
        //     // React.Fragmentで複数の要素をreturn する。<>はそのエイリアス
        //     <>
        //         {/* 親コンポーネントからDetailにpropsを渡す必要がある */}
        //         {detailsJsx}
        //         <Summary />
        //     </>
        // );
        const details = this.state.feeClassifications.map((fc, idx) => {
            return (
                <Detail key={idx.toString()} classification={fc} onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx, n)} />
            );
        });


        // reduce は 配列内の値について関数を適用するもの らしい。
        // mapは 配列のすべての要素に対して呼び出しを行って 新しい配列を作成
        const numOfPeople = this.state.feeClassifications.map(fc => fc.numOfPeople).reduce((p, c) => p + c);
        const totalAmount = this.state.feeClassifications.map(fc => fc.totalPrice).reduce((p, c) => p + c);

        return (
            <>
                {details}
                <Summary numOfPeople={numOfPeople} totalAmount={totalAmount} />
            </>
        )
    }
}

// 最上位のコンポーネント
const App: React.FC = () => {
    return (
        <div className="main">
            <AdmissionFeeCalculator />
        </div>
    );
}

export default App;