import { useState } from "react";

function App() {
    const [name, setName] = useState(""); // 인풋 관리용 state
    const [cart, setCart] = useState([]); // 장바구니 관리용 state

    const onAdd = event => {
        event.preventDefault();

        if (name === "") return;

        setCart([...cart, { name: name, quantity: 1 }]);
        setName("");
    };

    const onChange = e => {
        setName(e.target.value);
    };

    const onUpdateCount = (index, number) => {
        // 1갸지 가지 기능을 하는 함수를 만드는 건ㄱ데,
        // 1을 더하는 함수가 아니라 수량을 변경하는 함수를 만든것
        // 얼마를 바꿀 것인가는 함수를 실행할 때 매개변수를 통해 제어함
            const newCart = [...cart];
            const nextCount = newCart[index].quantity + number;
            if (nextCount > 0) {
                newCart[index].quantity = nextCount;
                setCart(newCart);
            }
        }

    return (
        <div>
            <h2>🛒Simple Shop</h2>
            <fieldset>
                <legend>상품추가</legend>
                <form
                    onSubmit={onAdd}>
                    <input
                        placeholder={"상품명을 입력하세요"}
                        onChange={onChange}
                        value={name}
                    />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <br />
            {/* reac에서 inline 형식으로 스타일ㅇ르 적용하는 방식은 style={} 을 이용함.
            단, 이 안에 들어가는 값은 객체로 작성
            css에서는 background-color=> backgroundColor*/}
            <table border={1} cellSpacing={0} cellPadding={10} style={{ width: "100%" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>상품명</th>
                        <th>수량제어</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.name}</td>
                                <td>
                                    <button onClick={() => onUpdateCount(index, -1)}>-</button>
                                    {value.quantity}
                                    <button onClick={() => onUpdateCount(index, -1)}>+</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setCart(
                                                cart.filter((v, i) => {
                                                    return i !== index;
                                                }),
                                            );
                                        }}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량 : 0개</h3>
        </div>
    );
}

export default App;
