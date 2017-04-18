<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <div class="panel panel-default">
          <!-- START list group-->
          <div class="list-group">
            <!-- START list group item 1 -->
            <div class="media-box">
              <div class="pull-left">
                <img class="media-object" src="/static/img/app_icons/default_icon_img.png" alt="" title="" style="border-radius:5em;" width="90">
              </div>
              <div class="media-body" style="padding-top: 15px;">
                <h4 class="media-heading">{{exam.name}}</h4>
                <h6>Tempo restante: 1h 5m 22s</h6>
              </div>
            </div>
          </div>
          <div class="panel-body bt text-center">
            <div class="row">
              <a href="#">
                <div class="col-xs-12">
                  <em class="icon-arrow-left"></em><br>
                  <strong>Voltar</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
          <!-- Main panel-->
        <div class="panel b" v-loading.body="loading">
          <div v-for="(question, index) in exam.questions" :key="question.id">
            <div v-show="index === questionIndex">
              <div class="panel-heading">
                <h4 class="mv"><b>Questão {{index+1}}</b></h4>
              </div>
              <div class="panel-body text-justify">
                <p v-html="question.body"></p>
              </div>
              <div class="panel-body bt">
                <div class="panel-heading">
                  <h4 class="mv"><b>Respostas</b></h4>
                </div>
                <div class="mb-boxes">
                  <div class="panel panel-default">
                    <ul class="nav nav-pills nav-stacked">
                      <li class="check">
                        <div class="radio c-radio">
                          <label class="checkbox c-checkbox c-checkbox-rounded space">
                          <input type="radio" v-model="answerQuestion" value="a" @click="checkAnswer(question.id)">
                          <span class="fa fa-circle"></span><p v-html="question.opta" style="display:inline;"></p></label>
                        </div>
                      </li>
                      <li class="check">
                        <div class="radio c-radio">
                          <label class="checkbox c-checkbox c-checkbox-rounded space">
                          <input type="radio" v-model="answerQuestion" value="b" @click="checkAnswer(question.id)">
                          <span class="fa fa-circle"></span><p v-html="question.optb" style="display:inline;"></p></label>
                        </div>
                      </li>
                      <li class="check">
                        <div class="radio c-radio">
                          <label class="checkbox c-checkbox c-checkbox-rounded space">
                          <input type="radio" v-model="answerQuestion" value="c" @click="checkAnswer(question.id)">
                          <span class="fa fa-circle"></span><p v-html="question.optc" style="display:inline;"></p></label>
                        </div>
                      </li>
                     <li class="check">
                        <div class="radio c-radio">
                          <label class="checkbox c-checkbox c-checkbox-rounded space">
                          <input type="radio" v-model="answerQuestion" value="d" @click="checkAnswer(question.id)">
                          <span class="fa fa-circle"></span><p v-html="question.optd" style="display:inline;"></p></label>
                        </div>
                      </li>
                      <li class="check">
                        <div class="radio c-radio">
                          <label class="checkbox c-checkbox c-checkbox-rounded space">
                          <input type="radio" v-model="answerQuestion" value="e" @click="checkAnswer(question.id)">
                          <span class="fa fa-circle"></span><p v-html="question.opte" style="display:inline;"></p></label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body bt text-center">
            <div class="row">
              <a href="#" :class="{disabled: questionIndex === 0}" @click.prevent="prev">
                <div class="col-xs-4 br">
                  <em class="icon-arrow-left"></em><br>
                  <strong>Anterior</strong>
                </div>
              </a>
              <a href="#" @click.prevent="showDialog">
                <div class="col-xs-4 br">
                  <em class="icon-grid"></em><br>
                  <strong>Questões</strong>
                </div>
              </a>
              <a href="#" @click.prevent="next">
                <div class="col-xs-4">
                  <em class="icon-arrow-right"></em><br>
                  <strong>Próximo</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="Painel de questões" v-model="showDialogQuestion">
      <div class="media-box">

        <div class="media-box-body clearfix text-center">
          <div class="media-box-heading">
            <small>Resolvidas: 3 de {{exam.questions.length}} questões</small>
          </div>

          <span v-for="(question, index) in exam.questions" :key="question.id">

             <a href="#" @click.prevent="selectQuestion(index, question.user_answer)"  :class="['btn', 'btn-sm', 'btn-default', {'btn-warning': question.user_answer}]">{{index+1}}</a>

           </span>

        </div>
      </div>

      <span slot="footer" class="dialog-footer">
       <el-button @click="showDialogQuestion = false">Cancelar</el-button>
       <el-button type="danger" @click.prevent="finishExam">Finalizar</el-button>
     </span>
    </el-dialog>

  </div>


</template>

<script>

import { delay } from 'lodash';

export default {
  name: 'subject',
  data() {
    return {
      exam: '',
      url: '',
      questionIndex: 0,
      loading: false,
      answerQuestion: 0,
      showDialogQuestion: false,
    };
  },
  mounted() {
    this.getSubjects();
  },
  methods: {
    getSubjects() {
      this.$http.get(`http://teste.ead.fractaltecnologia.com.br/api/v1/groups/${this.$route.params.id}`)
      .then((response) => {
        this.exam = response.data.exam;
        this.answerQuestion = this.exam.questions[this.questionIndex].user_answer;
      });
    },
    next() {
      this.loading = true;
      delay(() => {
        this.questionIndex += 1;
        if (this.exam.questions[this.questionIndex] !== undefined) {
          this.answerQuestion = this.exam.questions[this.questionIndex].user_answer;
        } else {
          this.questionIndex -= 1;
          this.showDialogQuestion = true;
        }
        this.loading = false;
      }, 500);
    },
    prev() {
      this.loading = true;
      delay(() => {
        this.questionIndex -= 1;
        this.answerQuestion = this.exam.questions[this.questionIndex].user_answer;
        this.loading = false;
      }, 500);
    },
    checkAnswer(questionId) {
      this.$http.post('http://teste.ead.fractaltecnologia.com.br/api/v1/exams/submit_question', {
        exam_id: this.exam.id,
        question_id: questionId,
        choosed: this.answerQuestion,
      }).then(() => {
        this.exam.questions[this.questionIndex].user_answer = this.answerQuestion;
      });
    },
    selectQuestion(index, answer) {
      this.questionIndex = index;
      this.answerQuestion = answer;
      this.showDialogQuestion = false;
    },
    showDialog() {
      this.showDialogQuestion = true;
    },
    finishExam() {
      this.$http.post('/exams/finish_exam', {
        exam_id: this.exam.id,
      }).then(() => {
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>

<style lang="css">
</style>
