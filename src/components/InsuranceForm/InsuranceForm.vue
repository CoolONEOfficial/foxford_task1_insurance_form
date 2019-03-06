<template>
    <div class="InsuranceForm">
        <v-container
                align-center justify-center fill-height>
            <v-flex xs12 md8 lg6>
                <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
                    <v-stepper-header class="hidden-sm-and-down">
                        <v-stepper-step :complete="step > 1 || completed" step="1">Автомобиль</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="step > 2 || completed" step="2">Владелец</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3" :complete="completed">Параметры страховки</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-step :complete="step > 1 || completed" step="1" class="hidden-md-and-up">Автомобиль
                        </v-stepper-step>

                        <v-stepper-content step="1">
                            <v-layout row wrap justify-space-between>
                                <v-flex xs12 md6 grow pa-1>
                                    <v-autocomplete
                                            v-model="modelAutoBrand"
                                            :items="brands"
                                            label="Производитель"
                                            persistent-hint
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex xs12 md6 grow pa-1>
                                    <v-autocomplete
                                            v-if="showAutoModel"
                                            v-model="modelAutoModel"
                                            :items="models"
                                            label="Модель"
                                            persistent-hint
                                    >
                                    </v-autocomplete>
                                </v-flex>

                            </v-layout>

                            <v-subheader>
                                Пробег
                            </v-subheader>
                            <v-slider
                                    class="px-3"
                                    :label="
                                            modelMileage == null ? '' :
                                            modelMileage === 6 ? 'лет'
                                                : modelMileage === 2 ? 'год'
                                                : 'года'
                                        "
                                    inverse-label="true"
                                    v-model="modelMileage"
                                    :tick-labels="Array(
                                            '<0.5', '0.5', '1', '2', '3', '4', '>5'
                                        )"
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
                                Next
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="step > 2 || completed" step="2" class="hidden-md-and-up">Владелец
                        </v-stepper-step>

                        <v-stepper-content step="2" pa-3>
                            <v-subheader>
                                Количество водителей
                            </v-subheader>
                            <v-slider
                                    class="px-3"
                                    v-model="modelDriversCount"
                                    :tick-labels="Array('1', '2', '3', '4', '>5')"
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
                                    class="px-3"
                                    :label="
                                            modelDrivingExp == null ? '' :
                                            modelDrivingExp === 6 ? 'лет'
                                                : modelDrivingExp === 2 ? 'год'
                                                : 'года'
                                        "
                                    inverse-label="true"
                                    v-model="modelDrivingExp"
                                    :tick-labels="Array('<0.5', '0.5', '1', '2', '3', '4', '>5')"
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
                                    class="px-3"
                                    :label="
                                            modelAge == null ? '' :
                                            modelAge === 0
                                                ? 'года'
                                                : 'лет'
                                        "
                                    inverse-label="true"
                                    v-model="modelAge"
                                    :tick-labels="Array('18-22', '23-30', '31-40', '41-50', '50+')"
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
                                Next
                            </v-btn>

                            <v-btn flat
                                   @click="step--"
                            >Back
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="3" :complete="completed" class="hidden-md-and-up">Параметры страховки
                        </v-stepper-step>

                        <v-stepper-content step="3" pa-3>
                            <v-subheader>
                                Франшиза
                            </v-subheader>
                            <v-slider
                                    class="px-3"
                                    label="т. р."
                                    inverse-label="true"
                                    v-model="modelFranchise"
                                    :tick-labels="Array('5', '10', '20', '30', '40', '50')"
                                    :max="5"
                                    step="1"
                                    ticks="always"
                                    tick-size="2"
                            ></v-slider>
                            <v-select
                                    :items="Array(
                                            'по направлению страховщика',
                                            'официальный дилер',
                                            'неважно'
                                        )"
                                    label="Направление на ремонт"
                                    @change="modelInsuranceChange"
                            ></v-select>

                            <v-btn
                                    color="primary"
                                    :disabled="!thirdStepCompleted"
                                    @click="completed = true"
                            >
                                Done
                            </v-btn>

                            <v-btn flat
                                   @click="step--"
                            >
                                Back
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-container>
    </div>
</template>

<script>
    import {db, sg} from '../../main'

    let brands = [], models = [];

    console.log("started..");

    export default {
        data() {
            return {
                completed: false,
                modelAutoBrand: null,
                modelAutoModel: null,
                modelDrivingExp: null,
                modelAge: null,
                modelMileage: null,
                modelDriversCount: null,
                modelFranchise: null,
                modelInsurance: null,
                step: 0,
                brands: brands,
                models: models,
            }
        },
        methods: {
            modelInsuranceChange: function (val) {
                this.modelInsurance = val;
            }
        },
        watch: {
            modelAutoBrand(val, _) {
                console.log("brand: " + val);
                if (val != null) {
                    db.collection("autos").where("brand", "==", val).get().then
                    (querySnapshot => {
                        if (querySnapshot.docs.length > 0) {
                            models.splice(0, models.length);
                            models.push(
                                ...querySnapshot.docs[0].data().models
                            );
                        }
                    })
                }
            },
        },
        computed: {
            showAutoModel() {
                return this.modelAutoBrand != null;
            },
            firstStepCompleted() {
                return this.modelAutoBrand != null
                    && this.modelAutoModel != null
                    && this.modelMileage != null;
            },
            secondStepCompleted() {
                return this.modelDrivingExp != null
                    && this.modelDriversCount != null
                    && this.modelAge != null;
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
                    value => value.data().brand
                ));
            })
        },
    }
</script>
