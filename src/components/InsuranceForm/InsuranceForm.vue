<template>
    <div class="InsuranceForm">
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Автомобиль</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="step > 2" step="2">Владелец</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Параметры КАСКО</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                            class="mb-5 pa-3"
                            color="grey lighten-3"
                            min-height="200px"
                    >
                        <v-img :src="brandImage" alt=""></v-img>
                        <v-autocomplete
                                v-model="modelAutoBrand"
                                :items="brands"
                                :label="`Производитель`"
                                persistent-hint
                        >
                        </v-autocomplete>
                        <v-autocomplete
                                v-if="showAutoModel"
                                v-model="modelAutoModel"
                                :items="models"
                                :label="`Модель`"
                                persistent-hint
                        >
                        </v-autocomplete>
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
                        <v-subheader>Количество водителей</v-subheader>
                        <v-slider
                                v-model="driversCount"
                                :tick-labels="Array('1', '2', '3', '4', '>5')"
                                :max="4"
                                step="1"
                                ticks="always"
                                tick-size="2"
                        ></v-slider>
                        <v-subheader>{{
                            driversCount > 0
                            ? "Минимальный стаж вождения водителей"
                            : "Стаж вождения водителя"
                            }}
                        </v-subheader>
                        <v-slider
                                v-model="drivingExp"
                                :tick-labels="Array('<0.5', '0.5', '1', '2', '3', '4', '>5')"
                                :max="6"
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
                    ></v-card>

                    <v-btn
                            color="primary"
                            :disabled="!thirdStepCompleted"
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
    </div>
</template>

<script>
    import {db, sg} from '../../main'

    let brands = [], models = [];

    console.log("started..");

    export default {
        data() {
            return {
                modelAutoBrand: null,
                modelAutoModel: null,
                driversCount: null,
                drivingExp: null,
                brandImage: null,
                step: 0,
                brands: brands,
                models: models,
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
                return this.modelAutoBrand != null && this.modelAutoModel != null;
            },
            secondStepCompleted() {
                return this.drivingExp != null;
            },
            thirdStepCompleted() {
                return true;
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
