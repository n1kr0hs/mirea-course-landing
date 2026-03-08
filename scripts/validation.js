// validation.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Сбрасываем предыдущие ошибки
    document.querySelectorAll(".border-red-500").forEach((el) => {
      el.classList.remove("border-red-500");
    });
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    let isValid = true;

    // 1. Проверка имени (не пустое, минимум 2 слова для ФИО-подобного)
    const name = document.getElementById("name");
    const nameValue = name.value.trim();
    if (nameValue === "") {
      showError(name, "Введите ваше имя");
      isValid = false;
    } else {
      const words = nameValue.split(" ").filter((word) => word.length > 0);
      if (words.length < 2) {
        showError(name, "Введите фамилию и имя");
        isValid = false;
      }
    }

    // 2. Проверка email (не пустой, базовый формат)
    const email = document.getElementById("email");
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
      showError(email, "Введите email");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(email, "Введите корректный email");
      isValid = false;
    }

    // 3. Проверка темы (выбрана)
    const subject = document.getElementById("subject");
    const subjectValue = subject.value;
    if (subjectValue === "") {
      showError(subject, "Выберите тему");
      isValid = false;
    }

    // 4. Проверка сообщения (не пустое)
    const message = document.getElementById("message");
    const messageValue = message.value.trim();
    if (messageValue === "") {
      showError(message, "Введите сообщение");
      isValid = false;
    }

    // 5. Проверка согласия (отмечено)
    const consent = document.getElementById("consent");
    if (!consent.checked) {
      showError(consent, "Необходимо согласиться на обработку данных");
      isValid = false;
    }

    // Если всё корректно - диспатчим событие
    if (isValid) {
      const formData = {
        name: nameValue,
        email: emailValue,
        subject: subjectValue,
        message: messageValue,
        consent: consent.checked,
      };
      const event = new CustomEvent("formValid", { detail: formData });
      document.dispatchEvent(event);
      alert("Форма отправлена! Данные в консоли.");
    }
  });

  // Функция показа ошибки
  function showError(input, message) {
    input.classList.add("border-red-500");
    const error = document.createElement("p");
    error.classList.add("error-message", "text-red-500", "text-sm", "mt-1");
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  // Сброс ошибки при вводе
  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("border-red-500");
      const errors = this.parentNode.querySelectorAll(".error-message");
      errors.forEach((el) => el.remove());
    });
  });
});
