<template>
  <section id="contact" class="ac-section ac-contact">
    <div class="ac-wrap ac-contact__inner">
      <div class="ac-contact__copy">
        <p class="ac-eyebrow">{{ contact.eyebrow }}</p>
        <h2 class="ac-title">{{ contact.title }}</h2>
        <p class="ac-lede">{{ contact.body }}</p>

        <ul class="ac-contact__details">
          <li>
            <q-icon name="mail_outline" size="20px" />
            <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </li>
          <li>
            <q-icon name="call" size="20px" />
            <a :href="`tel:${phoneHref}`">{{ contact.phone }}</a>
          </li>
          <li>
            <q-icon name="public" size="20px" />
            <span>{{ contact.office }}</span>
          </li>
        </ul>
      </div>

      <q-card flat class="ac-contact__card">
        <q-card-section class="ac-contact__card-inner">
          <q-form ref="formRef" greedy class="ac-form" @submit.prevent="onSubmit">
            <div class="ac-form__row">
              <q-input
                v-model.trim="form.name"
                outlined
                dense
                label="Your name"
                :rules="nameRules"
                lazy-rules
              />
              <q-input
                v-model.trim="form.email"
                outlined
                dense
                label="Email"
                type="email"
                :rules="emailRules"
                lazy-rules
              />
            </div>

            <q-input
              v-model.trim="form.school"
              outlined
              dense
              label="School or organisation"
            />

            <q-input
              v-model.trim="form.message"
              outlined
              dense
              type="textarea"
              label="How can we help?"
              autogrow
              :rules="messageRules"
              :input-style="{ minHeight: '96px' }"
              lazy-rules
            />

            <div class="ac-form__actions">
              <q-btn
                type="submit"
                class="ac-btn ac-btn--shadow"
                color="primary"
                text-color="white"
                unelevated
                no-caps
                :loading="sending"
                label="Send message"
              />
              <span class="ac-form__hint">We reply within one working day.</span>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Notify } from 'quasar'
import { api } from 'boot/axios'
import { contact } from '../landingData'

const formRef = ref(null)
const sending = ref(false)

const form = ref({
  name: '',
  email: '',
  school: '',
  message: ''
})

const nameRules = [
  value => Boolean(value) || 'Please tell us your name.'
]

const emailRules = [
  value => Boolean(value) || 'Please add an email address.',
  value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'That email does not look right.'
]

const messageRules = [
  value => Boolean(value) || 'Please add a short message.',
  value => (value && value.length >= 10) || 'A sentence or two is plenty.'
]

const phoneHref = computed(() => contact.phone.replace(/[^+\d]/g, ''))

async function onSubmit () {
  if (sending.value) return

  sending.value = true

  try {
    if (contact.endpoint) {
      await api.post(contact.endpoint, { ...form.value })
    } else {
      // Demo mode: no endpoint configured, so nothing is sent anywhere.
      await new Promise(resolve => setTimeout(resolve, 650))
    }

    Notify.create({
      type: 'positive',
      message: contact.success,
      position: 'bottom',
      timeout: 6000
    })

    form.value = { name: '', email: '', school: '', message: '' }
    if (formRef.value) formRef.value.resetValidation()
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: `We could not send that. Please email ${contact.email} instead.`,
      position: 'bottom',
      timeout: 7000
    })
  } finally {
    sending.value = false
  }
}
</script>

<style lang="scss" scoped>
.ac-contact {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f5f9fd 100%);
}

.ac-contact__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 56px;
  align-items: start;
}

.ac-contact__details {
  margin: 30px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}

.ac-contact__details li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--ac-body);
}

.ac-contact__details .q-icon {
  color: var(--ac-primary);
}

.ac-contact__details a {
  color: var(--ac-ink);
  font-weight: 500;
  text-decoration: none;
}

.ac-contact__details a:hover {
  color: var(--ac-primary);
  text-decoration: underline;
}

.ac-contact__card {
  border: 1px solid var(--ac-border);
  border-radius: var(--ac-radius-lg);
  background: #fff;
  box-shadow: var(--ac-shadow-lg);
}

.ac-contact__card-inner {
  padding: 28px;
}

.ac-form {
  display: grid;
  gap: 14px;
}

.ac-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.ac-form__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 4px;
}

.ac-form__hint {
  font-size: 0.82rem;
  color: var(--ac-muted);
}

@media (max-width: 959px) {
  .ac-contact__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }
}

@media (max-width: 599px) {
  .ac-contact__card-inner {
    padding: 20px;
  }

  .ac-form__row {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
