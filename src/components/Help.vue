<template>
  <div class="help">
    <div class="row">
      <div class="col-4">
        <MDBBtn outline="success" floating>
          <MDBIcon icon="backspace" iconStyle="fas"/>
        </MDBBtn>
      </div>
      <div class="col-8">
        Удалить последний введённый символ
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <MDBBtn outline="success" floating>
          <MDBIcon icon="redo" iconStyle="fas"/>
        </MDBBtn>
      </div>
      <div class="col-8">
        Следующий пример
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <MDBBtn outline="success" floating>
          <MDBIcon icon="calculator" iconStyle="fas"/>
        </MDBBtn>
      </div>
      <div class="col-8">
        Проверить ответ
      </div>
    </div>
  </div>
</template>

<script>
import {MDBBtn, MDBIcon} from "mdb-vue-ui-kit"

export default {
  name: 'Help',
  components: {
    MDBBtn, MDBIcon
  }
}
</script>

<style scoped>
.help {
  width: 300px;
  margin: 0 auto
}

.help .row{
  padding: 0.5em 0;
}

.help .col-8 {
  text-align: left;
  font-weight: bold;
}
</style>