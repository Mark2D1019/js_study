import "./styles.css";

const onClickAdd = () => {
	//テキストボックスの値を取得し、削除する。
	const inputText = document.getElementById("add-text").value;
	document.getElementById("add-text").value = "";

	createIncompeleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
	document.getElementById("imcomplete-list").removeChild(target);
};

const deleteFromCompleteList = (target) => {
	document.getElementById("complete-list").removeChild(target);
};

document
	.getElementById("add-button")
	.addEventListener("click", () => onClickAdd());

const createIncompeleteList = (text) => {
	//divを作成
	const div = document.createElement("div");
	div.className = "list-row";
	//make li tag
	const li = document.createElement("li");
	li.innerText = text;

	//完了ボタンの実装
	const completeButton = document.createElement("button");
	completeButton.innerText = "完了";
	completeButton.addEventListener("click", () => {
		//完了リストに追加するターゲット
		const addTarget = completeButton.parentNode;
		//内容のテキストを取得
		const text = addTarget.firstElementChild.innerText;

		deleteFromIncompleteList(addTarget);
		//div以下を初期化する(初期化しない状態では入力文字、完了、削除の文字が取得できる)
		addTarget.textContent = null;

		const li = document.createElement("li");
		li.innerText = text;

		const backButton = document.createElement("button");
		backButton.innerText = "戻す";

		backButton.addEventListener("click", () => {
			const deleteTarget = backButton.parentNode;
			const text = deleteTarget.firstElementChild.innerHTML;
			deleteFromCompleteList(deleteTarget);
			createIncompeleteList(text);
		});
		addTarget.appendChild(li);
		addTarget.appendChild(backButton);

		//完了済みリストに上記のリスト（addTarget）を移行する
		document.getElementById("complete-list").appendChild(addTarget);
	});

	//削除ボタンの実装
	const deleteButton = document.createElement("button");
	deleteButton.innerText = "削除";
	deleteButton.addEventListener("click", () => {
		//押された削除ボタンの親タグを未完了リストから削除
		const deleteTarget = deleteButton.parentNode;
		deleteFromIncompleteList(deleteTarget);
	});

	div.appendChild(li);
	div.appendChild(completeButton);
	div.appendChild(deleteButton);

	document.getElementById("imcomplete-list").appendChild(div);
};
