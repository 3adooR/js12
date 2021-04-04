<template>
  <div v-if="!seconds" class="alert alert-danger text-center" role="alert">Время вышло :(</div>
  <div v-else class="training">
    <div class="row">
      <div class="time col-12 text-center">
        До конца тренировки осталось <b>{{ seconds }}</b> секунд
      </div>
    </div>
    <div class="row">
      <div class="task col-12">
        <span>
          <span v-if="inputNum !== 1">{{ num1 }}</span>
          <input v-else v-model="userInput"/>
        </span>
        <span class="operator">{{ operation1 }}</span>
        <span>
          <span v-if="inputNum !== 2">{{ num2 }}</span>
          <input v-else v-model="userInput"/>
        </span>
        <span v-if="num3">
          <span class="operator">{{ operation1 }}</span>
          <span>
            <span v-if="inputNum !== 3">{{ num3 }}</span>
            <input v-else v-model="userInput"/>
          </span>
        </span>
        <span class="operator">=</span>
        <span>
          <span v-if="inputNum !== 0">{{ result }}</span>
          <input v-else v-model="userInput"/>
        </span>
      </div>
    </div>

    <div class="calc row">
      <div class="numbers col-8">
        <MDBBtn color="success" floating v-for="num in numbers" :key="num">
          <MDBIcon @click="numPress(num)">{{ num }}</MDBIcon>
        </MDBBtn>
      </div>
      <div class="col-4">
        <MDBBtn outline="success" floating v-for="action in actions" :key="action">
          <MDBIcon v-if="action==='<'" @click="doAction(action)" icon="backspace" iconStyle="fas"/>
          <MDBIcon v-if="action==='>'" @click="doAction(action)" icon="redo" iconStyle="fas"/>
          <MDBIcon v-if="action==='?'" @click="doAction(action)" icon="question" iconStyle="fas"/>
          <MDBIcon v-else @click="doAction(action)" icon="calculator" iconStyle="fas"/>
        </MDBBtn>
      </div>
    </div>
  </div>

  <Modal v-model="modal">
    <MDBModalBody v-if="modalMessage === 'success'">
      <h2 class="text-success">Верно!</h2>
      <p>Молодец! Продолжай в том же духе!</p>
      <MDBBtn color="success" @click="newExample">Ещё!</MDBBtn>
    </MDBModalBody>
    <MDBModalBody v-else-if="modalMessage === 'failed'">
      <h2 class="text-danger">Ошибочка!</h2>
      <p>Будь внимательнее, не торопись, и всё получится.</p>
      <MDBBtn color="success" @click="newExample">Попробую ещё</MDBBtn>
    </MDBModalBody>
    <MDBModalBody v-else>
      <Help/>
      <MDBBtn color="success" @click="newExample">Всё понятно</MDBBtn>
    </MDBModalBody>
  </Modal>
</template>

<script>
import {ref, computed, watch, onMounted} from "vue"
import {useStore} from "vuex"
import {MDBBtn, MDBIcon, MDBModalBody} from "mdb-vue-ui-kit"
import Modal from "@/components/Modal";
import Help from "@/components/Help";

export default {
  name: 'Training',
  setup() {
    const store = useStore();
    const userInput = ref('?');
    const complexity = computed(() => store.state.duration);
    const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '-']);
    const actions = ref(['<', '>', '?', '=']);

    // Modal
    const modal = ref(false);
    const modalMessage = ref('');

    // Time
    const duration = computed(() => store.state.duration);
    const seconds = ref(duration.value * 60);
    onMounted(() => {
      setInterval(() => {
        if (seconds.value > 0) {
          seconds.value--;
        }
      }, 1000);
    });

    /**
     * Get number of operations (1 or 2) by complexity
     * @returns {number}
     */
    const numOperations = () => (complexity.value > 7) ? 2 : 1;

    /**
     * Get max number by complexity
     * @returns {number}
     */
    const getMaxNum = () => {
      let maxRndNum = 10;
      if (complexity.value > 8) {
        maxRndNum = 100;
      } else {
        if (complexity.value > 5) maxRndNum = 20;
      }
      return maxRndNum;
    }

    /**
     * Get number of input
     * @returns {number}
     */
    const inputNum = computed(() => {
      return Math.floor(Math.random() * 3);
    });

    /**
     * Get random number
     * @returns {number}
     */
    const getRandomNumber = () => {
      return Math.floor(Math.random() * getMaxNum());
    }

    /**
     * Get random operator
     * @returns {*}
     */
    const getRandomOperator = () => {
      let operations = [];
      if (store.state.cfgSum) operations.push('+');
      if (store.state.cfgDiff) operations.push('-');
      if (store.state.cfgMulti) operations.push('*');
      if (store.state.cfgDiv) operations.push('/');
      let keys = Object.keys(operations);
      return operations[keys[keys.length * Math.random() << 0]];
    };

    /**
     * Calc
     * @type {{"*": (function(*, *)), "+": (function(*, *)), "-": (function(*, *)), "/": (function(*, *))}}
     */
    const calcIt = {
      '+': (x, y) => (x + y),
      '-': (x, y) => (x - y),
      '*': (x, y) => (x * y),
      '/': (x, y) => (x / y).toFixed(2),
    };

    /**
     * Calc result
     * @param num1Val
     * @param num2Val
     * @param num3Val
     * @returns {*}
     */
    const calcResult = (num1Val, num2Val, num3Val) => {
      let res = calcIt[operation1.value](num1Val, num2Val);
      if (numOperations() === 2) res = calcIt[operation2.value](res, num3Val);
      return res;
    }

    // Generating example
    const num1 = ref(getRandomNumber());
    const operation1 = ref(getRandomOperator());
    const num2 = ref(getRandomNumber());
    const operation2 = ref((numOperations() === 2) ? getRandomOperator() : '+');
    const num3 = ref((numOperations() === 2) ? getRandomNumber() : 0);
    const result = computed(() => calcResult(num1.value, num2.value, num3.value));

    /**
     * Generate new example
     */
    const newExample = () => {
      modal.value = false;
      userInput.value = '?';
      num1.value = getRandomNumber();
      operation1.value = getRandomOperator();
      num2.value = getRandomNumber();
      operation2.value = (numOperations() === 2) ? getRandomOperator() : '+';
      num3.value = (numOperations() === 2) ? getRandomNumber() : 0;
    }

    /**
     * Watching and formatting user input value
     */
    watch(userInput, () => {
      userInput.value = userInput.value.replace(/[^0-9.-]/g, '');
      if (!userInput.value) {
        userInput.value = '?';
      }
    });

    /**
     * User press number on keyboard - add number to user input
     */
    const numPress = (num) => userInput.value += num;

    /**
     * Show modal window
     */
    const showModal = (modalType) => {
      modalMessage.value = modalType;
      modal.value = true;
    }

    /**
     * Users action
     */
    const doAction = (name) => {
      let userRes = 0;
      let userVal = parseFloat(userInput.value);
      let num1Val = num1.value;
      let num2Val = num2.value;
      let num3Val = num3.value;

      switch (name) {
        case '<':
          // Delete previous character
          userInput.value = userInput.value.slice(0, -1);
          break;

        case '>':
          // Next
          newExample();
          break;

        case '?':
          // Show help
          showModal('help');
          break;

        case '=':
          // Test the answer
          switch (inputNum.value) {
            case 1:
              num1Val = userVal;
              break;
            case 2:
              num2Val = userVal;
              break;
            case 3:
              num3Val = userVal;
              break;
            default: {
              userRes = userVal;
            }
          }
          if (userRes === 0) {
            userRes = calcResult(num1Val, num2Val, num3Val);
          }
          if (userRes === result.value) {
            showModal('success');
          } else {
            showModal('failed');
          }
          break;

        default: {
          console.error('unknown action');
        }
      }
    }

    return {
      num1,
      num2,
      num3,
      operation1,
      operation2,
      result,
      userInput,
      modal,
      modalMessage,
      numbers,
      actions,
      inputNum,
      numPress,
      doAction,
      showModal,
      newExample,
      seconds
    }
  },
  components: {
    Modal,
    Help,
    MDBBtn,
    MDBIcon,
    MDBModalBody
  }
}
</script>

<style scoped>
time, .task, .calc, .modal-body {
  text-align: center;
}

.time {
  color: #666;
  font-size: 0.8em;
}

.task {
  font-weight: bold;
  font-size: 2em;
}

.task span {
  padding: 0 0.1em;
}

.task input {
  width: 60px;
  border: 0;
  padding: 0 0.1em;
  text-align: center;
  color: #41B883;
}

.calc button {
  margin: 1em;
}

.calc button i {
  font-size: 1.5em;
}

.numbers button i {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

.btn-success {
  background-color: #41B883;
}

.btn-outline-success {
  color: #41B883;
  border-color: #41B883
}

.alert {
  border-radius: 1em;
}
</style>