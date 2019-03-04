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
                                v-model="model"
                                :items="brands"
                                :label="`Производитель`"
                                persistent-hint
                                prepend-icon="mdi-city"
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

    let brands = [];

    console.log("started..");

    export default {
        data() {
            return {
                model: null,
                step: 0,
                brands: brands,
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
