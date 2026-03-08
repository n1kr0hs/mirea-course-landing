document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("formValid", function (event) {
    const formData = event.detail;

    console.clear();

    console.log("Имя и фамилия:", formData.name);
    console.log("Email:", formData.email);
    console.log("Тема:", formData.subject);
    console.log("Сообщение:", formData.message);
    console.log("Согласие:", formData.consent ? "Да" : "Нет");

    const timestamp = new Date().toLocaleString();
    console.log("Время отправки:", timestamp);
  });
});
