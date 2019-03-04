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
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    >
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
                    >
                        Next
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                    <v-btn
                            color="primary"
                            @click="step++"
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
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                    <v-btn
                            color="primary"
                    >
                        Done
                    </v-btn>

                    <v-btn flat
                           @click="step--"
                    >Back
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
    import {db} from '../../main'

    let brands = [], models = [];

    console.log("started..");

    export default {
        data() {
            return {
                modelAutoBrand: null,
                modelAutoModel: null,
                step: 0,
                brands: brands,
                models: models,
            }
        },
        watch: {
            modelAutoBrand(val, _){
                console.log("brand: " + val);
                if(val != null) {
                    db.collection("autos").where("brand", "==", val).get().then
                    (querySnapshot => {
                        if(querySnapshot.docs.length > 0) {
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
            }
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
