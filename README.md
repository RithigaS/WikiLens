# 🌐 WikiLens - My React Dashboard

WikiLens is a simple one-page website made with **React**. It has 4 different tools (widgets) on one screen. I built this to learn how React works.

![Project Preview](./screenshot.png)

---

## 🛠️ What are the 4 tools?

1. **Wikipedia Search**: You can search for articles. It waits for you to finish typing before searching (this is called "Debounce"). It also shows your last 5 searches.
2. **React FAQ**: A list of questions and answers. You can click a question to see the answer. There is a switch to open many questions at the same time.
3. **Language Selector**: A custom menu to pick a language. It uses real flag images. When you change the language, the Wikipedia search changes too!
4. **Real-Time Counter**: A number that goes up automatically. You can change the speed and the step. It also shows a small bar chart of the history.

---

## 🌗 Features

- **Dark Mode**: You can switch between Light and Dark mode. It remembers your choice.
- **Mobile Friendly**: It looks good on computers and phones.
- **Easy Code**: Every part is in its own folder with its own CSS.

---

## 📚 What React stuff did I use?

- `useState`: To keep track of data.
- `useEffect`: To fetch data from the internet.
- `useRef`: To handle timers and click-outside logic.
- **Custom Hooks**: I made my own hooks called `useDebounce` and `useLocalStorage`.

---

## 🚀 How to run it

1. Type `npm install` in your terminal.
2. Type `npm run dev` to start.
3. Open `http://localhost:5173` in your browser.

_Made by an Intern learning React!_
