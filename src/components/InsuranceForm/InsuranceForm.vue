<template>
    <div class="InsuranceForm">
        <v-container
                align-center justify-center fill-height>
            <v-flex xs12 md8 lg6>
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step :complete="step > 1" step="1">Автомобиль</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="step > 2" step="2">Владелец</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3" :complete="completed">Параметры страховки</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card
                                    class="mb-5 pa-3"
                                    color="grey lighten-3"
                                    min-height="200px"
                            >
                                <v-img :src="brandImage" alt=""></v-img>
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

                                <v-slider
                                        label="Пробег"
                                        v-model="modelMileage"
                                        :tick-labels="Array(
                                            '<0.5', '0.5', '1', '2', '3', '4', '>5'
                                        )"
                                        :max="6"
                                        step="1"
                                        ticks="always"
                                        tick-size="2"
                                ></v-slider>
                            </v-card>

                            <v-btn
                                    color="primary"
                                    @click="step++"
                                    :disabled="!firstStepCompleted"
                            >
                                Next
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card
                                    class="mb-5 pa-3"
                                    color="grey lighten-3"
                                    min-height="200px"
                            >
                                <v-slider
                                        label="Количество водителей"
                                        v-model="modelDriversCount"
                                        :tick-labels="Array('1', '2', '3', '4', '>5')"
                                        :max="4"
                                        step="1"
                                        ticks="always"
                                        tick-size="2"
                                ></v-slider>
                                <v-slider
                                        :label="modelDriversCount > 0
                                    ? 'Мин. стаж водителей'
                                    : 'Стаж водителя'"
                                        v-model="modelDrivingExp"
                                        :tick-labels="Array('<0.5', '0.5', '1', '2', '3', '4', '>5')"
                                        :max="6"
                                        step="1"
                                        ticks="always"
                                        tick-size="2"
                                ></v-slider>
                                <v-slider
                                        :label="modelDriversCount > 0
                                    ? 'Мин. возраст водителей'
                                    : 'Возраст водителя'"
                                        v-model="modelAge"
                                        :tick-labels="Array('18-22', '23-30', '31-40', '41-50', '50-99')"
                                        :max="4"
                                        step="1"
                                        ticks="always"
                                        tick-size="2"
                                ></v-slider>
                            </v-card>

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

                        <v-stepper-content step="3">
                            <v-card
                                    class="mb-5 pa-3"
                                    color="grey lighten-3"
                                    min-height="200px"
                            >
                                <v-slider
                                        label="Франшиза"
                                        v-model="modelFranchise"
                                        :tick-labels="Array('5к', '10к', '20к', '30к', '40к', '50к')"
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
                            </v-card>

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
                brandImage: null,
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
                            //brandImage = sg.ref("brands/" + );
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
                    && this.modelAge;
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
