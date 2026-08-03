// order-form.js — управление модальным окном заказа и отправка заявки

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('order-modal');
  const form = document.getElementById('order-form');
  const kitInput = document.getElementById('order-kit');
  const closeBtn = document.getElementById('order-modal-close');
  const successMsg = document.getElementById('order-success');
  const errorMsg = document.getElementById('order-error');
  const submitBtn = document.getElementById('order-submit');

  // Открытие модалки при клике на любую кнопку "Заказать"
  document.querySelectorAll('[data-order-kit]').forEach((btn) => {
    btn.addEventListener('click', () => {
      kitInput.value = btn.getAttribute('data-order-kit') || '';
      successMsg.classList.add('hidden');
      errorMsg.classList.add('hidden');
      form.reset();
      kitInput.value = btn.getAttribute('data-order-kit') || '';
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      kit: form.kit.value,
      comment: form.comment.value.trim(),
    };

    if (!data.name || !data.phone) {
      errorMsg.textContent = 'Пожалуйста, заполните имя и телефон.';
      errorMsg.classList.remove('hidden');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        successMsg.classList.remove('hidden');
        form.reset();
        setTimeout(closeModal, 2000);
      } else {
        errorMsg.textContent = 'Не удалось отправить заявку. Попробуйте позвонить нам напрямую.';
        errorMsg.classList.remove('hidden');
      }
    } catch (err) {
      errorMsg.textContent = 'Ошибка соединения. Попробуйте позже или позвоните нам.';
      errorMsg.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
    }
  });
});
