document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Спасибо! Ваше сообщение принято. Мы свяжемся с вами в ближайшее время.');
  this.reset();
});