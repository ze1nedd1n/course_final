<template>
    <div>
      <AuthenticateForm></AuthenticateForm>
    </div>
  </template>
  
  <script>
  import AuthenticateForm from '@/components/AuthenticateForm.vue'
  
  export default {
    name: 'AuthenticationPage',
    components: {
      AuthenticateForm
    }
  }
  </script>
  