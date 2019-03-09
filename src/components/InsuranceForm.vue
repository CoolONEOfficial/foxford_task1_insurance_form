<template>
    <div class="InsuranceForm">
        <v-container
                align-center justify-center fill-height>
            <v-flex xs12 md8 lg6>
                <v-stepper id="stepper" v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
                    <v-stepper-header class="hidden-sm-and-down">
                        <v-stepper-step
                                @click="step = 1"
                                :complete="step > 1"
                                step="1">
                            Автомобиль
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                                @click="step = firstStepCompleted ? 2 : step"
                                :complete="step > 2"
                                step="2">
                            Владелец
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                                @click="step = secondStepCompleted ? 3 : step"
                                step="3"
                                :complete="step > 3">
                            Параметры страховки
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-step
                                :complete="step > 1"
                                step="1"
                                class="hidden-md-and-up"
                                @click="step = 1">
                            Автомобиль
                        </v-stepper-step>

                        <v-stepper-content step="1">
                            <v-layout row wrap justify-space-between>
                                <v-flex xs12 md6 pa-1>
                                    <v-autocomplete
                                            v-model="modelAutoBrand"
                                            :items="brands"
                                            label="Производитель"
                                            persistent-hint
                                            return-object
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-img class="ma-1"
                                                   contain
                                                   max-height="24px"
                                                   max-width="40px"
                                                   :src="data.item.image">
                                            </v-img>

                                            <div> {{ data.item.text }}
                                            </div>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-avatar tile>
                                                <v-img class="ma-1"
                                                       contain
                                                       max-height="24px"
                                                       max-width="40px"
                                                       :src="data.item.image">
                                                </v-img>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title> {{ data.item.text }}
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex xs12 md6 grow pa-1>
                                    <v-autocomplete
                                            v-if="modelAutoBrand != null"
                                            v-model="modelAutoModel"
                                            :items="models"
                                            label="Модель"
                                            persistent-hint
                                            return-object
                                    >
                                        <template slot="selection" slot-scope="data">

                                            <v-img class="ma-1"
                                                   contain
                                                   max-height="24px"
                                                   max-width="40px"
                                                   :src="data.item.image">
                                            </v-img>

                                            <div> {{ data.item.text }}
                                            </div>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-avatar tile>
                                                <v-img class="ma-1"
                                                       contain
                                                       max-height="24px"
                                                       max-width="40px"
                                                       :src="data.item.image">
                                                </v-img>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title> {{ data.item.text }}
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>

                            </v-layout>

                            <v-subheader>
                                Пробег
                            </v-subheader>
                            <v-slider
                                    :label="
                                            modelMileage == null ? '' :
                                            modelMileage === 6 ? 'лет'
                                                : modelMileage === 2 ? 'год'
                                                : 'года'
                                        "
                                    inverse-label
                                    v-model="modelMileage"
                                    :tick-labels="labelsMileage"
                                    :max="6"
                                    step="1"
                                    ticks="always"
                                    tick-size="2"
                            ></v-slider>
                            <v-btn
                                    color="primary"
                                    @click="step++"
                                    :disabled="!firstStepCompleted"
                            >
                                Следующий
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-step
                                :complete="step > 2"
                                step="2"
                                class="hidden-md-and-up"
                                @click="step = firstStepCompleted ? 2 : step">
                            Владелец
                        </v-stepper-step>

                        <v-stepper-content step="2">
                            <v-subheader>
                                Количество водителей
                            </v-subheader>
                            <v-slider
                                    v-model="modelDriversCount"
                                    :tick-labels="labelsDriversCount"
                                    :max="4"
                                    step="1"
                                    ticks="always"
                                    tick-size="2"
                            ></v-slider>
                            <v-subheader>
                                {{
                                modelDriversCount > 0
                                ? 'Мин. стаж водителей'
                                : 'Стаж водителя'
                                }}
                            </v-subheader>
                            <v-slider
                                    :label="
                                            modelDriversExp == null ? '' :
                                            modelDriversExp === 6 ? 'лет'
                                                : modelDriversExp === 2 ? 'год'
                                                : 'года'
                                        "
                                    inverse-label
                                    v-model="modelDriversExp"
                                    :tick-labels="labelsDriversExp"
                                    :max="6"
                                    step="1"
                                    ticks="always"
                                    tick-size="2"
                            ></v-slider>
                            <v-subheader>
                                {{
                                modelDriversCount > 0
                                ? 'Мин. возраст водителей'
                                : 'Возраст водителя'
                                }}
                            </v-subheader>
                            <v-slider
                                    :label="
                                            modelDriversAge == null ? '' :
                                            modelDriversAge === 0
                                                ? 'года'
                                                : 'лет'
                                        "
                                    inverse-label
                                    v-model="modelDriversAge"
                                    :tick-labels="labelsDriversAge"
                                    :max="4"
                                    step="1"
                                    ticks="always"
                                    tick-size="2"
                            ></v-slider>
                            <v-btn
                                    color="primary"
                                    @click="step++"
                                    :disabled="!secondStepCompleted"
                            >
                                Следующий
                            </v-btn>

                            <v-btn flat
                                   @click="step--"
                            >
                                Назад
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-step
                                step="3"
                                :complete="step > 3"
                                class="hidden-md-and-up"
                                @click="step = secondStepCompleted ? 3 : step">
                            Параметры страховки
                        </v-stepper-step>

                        <v-stepper-content step="3">
                            <v-subheader>
                                Франшиза
                            </v-subheader>
                            <v-slider
                                    label="т. р."
                                    inverse-label
                                    v-model="modelFranchise"
                                    :tick-labels="labelsFranchise"
                                    :max="5"
                                    step="1"
                                    ticks="always"
                                    tick-size="2"
                            ></v-slider>
                            <v-select
                                    :items="[
                                            'по направлению страховщика',
                                            'официальный дилер',
                                            'не важно'
                                        ]"
                                    label="Направление на ремонт"
                                    v-model="modelInsurance"
                            ></v-select>

                            <v-btn
                                    color="primary"
                                    :disabled="!thirdStepCompleted"
                                    @click="step++"
                            >
                                Готово
                            </v-btn>

                            <v-btn flat
                                   @click="step--"
                            >
                                Назад
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                            <v-layout row wrap justify-space-between>
                                <v-flex xs12 md4 pa-1>
                                    <v-card>
                                        <v-card-title class="justify-center text-xs-center" primary-title>
                                            <h3 class="headline mb-0">Автомобиль</h3>
                                        </v-card-title>

                                        <v-layout column align-center pb-3>

                                            <h3 class="subheading mb-0">
                                                Производитель:
                                                <b>{{ modelAutoBrand != null ? modelAutoBrand.text : '' }}</b>
                                            </h3>

                                            <h3 class="subheading mb-0">
                                                Модель:
                                                <b>{{ modelAutoModel != null ? modelAutoModel.text : '' }}</b>
                                            </h3>

                                            <img class="pa-2"
                                                 alt=""
                                                 :src="modelAutoModel != null ? modelAutoModel.image : ''"
                                                 width="150px"
                                            >

                                            <h3 class="subheading mb-0">
                                                Пробег:
                                                <b>
                                                    {{
                                                    labelsMileage[modelMileage] + ' ' + (modelMileage == null ? '' :
                                                    modelMileage === 6 ? 'лет'
                                                    : modelMileage === 2 ? 'год'
                                                    : 'года')
                                                    }}
                                                </b>
                                            </h3>
                                        </v-layout>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4 pa-1>
                                    <v-card class="text-xs-center">
                                        <v-card-title class="justify-center" primary-title>
                                            <h3 class="headline mb-0">Владелец</h3>
                                        </v-card-title>
                                        <v-layout column pb-3>
                                            <h3 class="subheading mb-0">
                                                Количество водителей: <b>{{ labelsDriversCount[modelDriversCount] }}</b>
                                            </h3>
                                            <h3 class="subheading mb-0">
                                                {{
                                                modelDriversCount > 0
                                                ? 'Мин. стаж водителей'
                                                : 'Стаж водителя'
                                                }}:
                                                <b>
                                                    {{labelsDriversExp[modelDriversExp]
                                                    + ' ' + (modelDriversExp == null ? '' :
                                                    modelDriversExp === 6 ? 'лет'
                                                    : modelDriversExp === 2 ? 'год'
                                                    : 'года')
                                                    }}
                                                </b>
                                            </h3>
                                            <h3 class="subheading mb-0">
                                                {{
                                                modelDriversCount > 0
                                                ? 'Мин. возраст водителей'
                                                : 'Возраст водителя'
                                                }}:
                                                <b>{{
                                                    labelsDriversAge[modelDriversAge]
                                                    + ' ' + (modelDriversAge == null ? '' :
                                                    modelDriversAge === 0
                                                    ? 'года'
                                                    : 'лет')
                                                    }}
                                                </b>
                                            </h3>
                                        </v-layout>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4 pa-1>
                                    <v-card class="text-xs-center">
                                        <v-card-title class="justify-center text-xs-center" primary-title>
                                            <h3 class="headline mb-0">Параметры страховки</h3>
                                        </v-card-title>
                                        <v-layout column pb-3>
                                            <h3 class="subheading mb-0">
                                                Франшиза: <b>{{ labelsFranchise[modelFranchise] }} т.р.</b>
                                            </h3>
                                            <h3 class="subheading mb-0">
                                                Направление на ремонт: <b>{{ modelInsurance }}</b>
                                            </h3>
                                        </v-layout>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                            <h4 class="display-1 font-weight-light text-xs-center mt-5 mb-3">Как с Вами связаться?</h4>
                            <v-tabs fixed-tabs>
                                <v-tab
                                        v-for="title in ['Эл. почта', 'Телефон', 'Соцсети']"
                                        :key="title"
                                        ripple
                                >
                                    {{ title }}
                                </v-tab>
                                <v-tab-item>
                                    <v-text-field v-model="modelFeedbackMail"
                                                  placeholder="name@example.com"
                                                  autocomplete="email"
                                                  name="email"
                                                  label="Эл. почта"
                                                  type="email">
                                    </v-text-field>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-text-field v-model="modelFeedbackPhone"
                                                  placeholder="+7 (800) 535-35-35"
                                                  name="phone"
                                                  label="Номер телефона"
                                                  type="tel"
                                                  autocomplete="tel">
                                    </v-text-field>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-text-field v-model="modelFeedbackSocial"
                                                  placeholder="VK, Instagram, ..."
                                                  label="Ссылка на страничку в соцсети">
                                    </v-text-field>
                                </v-tab-item>
                            </v-tabs>
                            <v-btn
                                    color="primary"
                                    @click="sendFeedback"
                                    :disabled="!feedbackCompleted"
                            >
                                Отправить
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-container>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

    html, body {
        font-family: 'Roboto Condensed', sans-serif;
    }

    body {
        font-family: 'Roboto Condensed', sans-serif;
    }

    #app {
        font-family: 'Roboto Condensed', sans-serif;
    }

    .v-subheader {
        height: 40px;
    }

    .v-input--slider {
        margin-left: 12pt;
        margin-right: 12pt;
        margin-top: 0 !important;
    }

    .v-select .v-autocomplete {
        margin-bottom: -10px;
    }
</style>

<script>
    import {db, sg} from '../main'
    import Vue from 'vue'

    let brands = [], models = [];

    console.log("started..");

    export default {
        data() {
            return {
                modelAutoBrand: null,
                modelAutoModel: null,
                modelMileage: null,
                modelDriversCount: null,
                modelDriversExp: null,
                modelDriversAge: null,
                modelFranchise: null,
                modelInsurance: null,
                modelFeedbackSocial: null,
                modelFeedbackPhone: null,
                modelFeedbackMail: null,
                labelsMileage: ['<0.5', '0.5', '1', '2', '3', '4', '>5'],
                labelsDriversCount: ['1', '2', '3', '4', '>5'],
                labelsDriversExp: ['<0.5', '0.5', '1', '2', '3', '4', '>5'],
                labelsDriversAge: ['18-22', '23-30', '31-40', '41-50', '50+'],
                labelsFranchise: ['5', '10', '20', '30', '40', '50'],
                step: 0,
                brands: brands,
                models: models,
            }
        },
        methods: {
            sendFeedback() {

            },
        },
        watch: {
            modelAutoBrand(newBrand) {
                console.log("brand", newBrand);
                db.collection("autos").where("brand", "==", newBrand.text).get().then
                (querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        models.splice(0, models.length);
                        models.push(
                            ...querySnapshot.docs[0].data().models.map(
                                (model, index) => {
                                    const imageFilename =
                                        newBrand.text.toLowerCase()
                                        + '_'
                                        + model.split(' ').join('_').toLowerCase()
                                        + '.png';
                                    sg.ref("models").child(imageFilename).getDownloadURL().then(
                                        src => Vue.set(models, index, {
                                            text: models[index].text,
                                            image: src,
                                        })
                                    );
                                    return {
                                        text: model,
                                        image: "",
                                    }
                                }
                            )
                        );
                    }
                });
            },
        },
        computed: {
            feedbackCompleted() {
                return this.modelFeedbackMail != null
                    || this.modelFeedbackPhone != null
                    || this.modelFeedbackSocial != null;
            },
            firstStepCompleted() {
                return this.modelAutoBrand != null
                    && this.modelAutoBrand.image != null
                    && this.modelAutoModel != null
                    && this.modelAutoModel.image != null
                    && this.modelMileage != null;
            },
            secondStepCompleted() {
                return this.modelDriversExp != null
                    && this.modelDriversCount != null
                    && this.modelDriversAge != null;
            },
            thirdStepCompleted() {
                return this.modelFranchise != null
                    && this.modelInsurance != null;
            },
        },
        created() {
            db.collection("autos").get().then
            (querySnapshot => {
                console.log(querySnapshot.docs);
                brands.push(...querySnapshot.docs.map(
                    function (value, index) {
                        let data = value.data();
                        sg.ref('brands').child(data.brand.toLowerCase() + '.png').getDownloadURL()
                            .then(
                                src => Vue.set(brands, index, {
                                    text: brands[index].text,
                                    image: src,
                                })
                            );
                        console.log(data);
                        return {
                            text: data.brand,
                            image: "",
                        };
                    }
                ));
            })
        },
    }
</script>
