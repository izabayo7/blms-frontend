<template>
    <v-app>
        <div class="feedback"></div>
        <v-row class="new-class-form ml-2 ml-md-10 mt-5 mt-md-10">
            <v-col class="col-12">
                <h1 class="d-block">CREATE NEW COURSE</h1>
                <div class="new-class-btns mb-5">
                    <v-btn
                            rounded
                            text
                            :class="`details-btn ${type == 'details' ? 'new-active-btn' : ''}`"
                    >Course Details
                    </v-btn
                    >
                    <v-btn
                            rounded
                            text
                            :class="`chapters-btn ${
              type == 'chapters' ? 'new-active-btn' : ''
            }`"
                    >Course Chapters
                    </v-btn
                    >
                </div>
            </v-col>
            <v-col v-if="type == 'details'" class="col-12 col-md-6 mt-n4">
                <v-form>
                    <h3 class="input_lable">Course Name</h3>
                    <input v-model="course.name" type="text" class="course_input" placeholder="Type course name..." />
                    <h3 class="input_lable">Student Group</h3>
                    <v-select
                            v-model="selectedFacultyCollegeYearName"
                            :items="facultyCollegeYearNames"
                            chips
                            solo
                            class="group-select elevation-0"
                    ></v-select>
                    <h3 class="input_lable mt-0">Course Description</h3>
                    <textarea
                            v-model="course.description"
                            class="kurious--textarea mb-4 customScroll"
                            rows="8"
                    ></textarea>
                    <h3>Course Cover Image</h3>
                    <v-btn
                            fab
                            small
                            text
                            class="new-active-btn course-image mt-4 mb-6 mr-4"
                            @click="pickfile()"
                    >
                        <v-icon>mdi-paperclip</v-icon>
                    </v-btn>
                    <span>{{
            coverPicture === undefined
              ? "Upload Course CoverPicture"
              : coverPicture.name
          }}</span>
                    <input
                            ref="file"
                            type="file"
                            hidden
                            accept="image/*"
                            id="picture"
                            class="d-none my-6"
                            @change="handleFileUpload()"
                    />
                    <div class="actions mx-0">
                        <v-btn
                                rounded
                                text
                                class="new-active-btn mb-6 mx-2"
                                @click="validate()"
                        >Save Course
                        </v-btn
                        >
                        <v-btn
                                color="transparent"
                                class="cancel-quiz mt-n4 mx-2"
                                @click="$router.push('/courses')"
                        >Cancel
                        </v-btn
                        >
                    </div>
                </v-form>
            </v-col>
            <v-col v-else class="col-12 pr-12">
                <chapters action="create"/>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "create_course",
        components: {
            chapters: () => import("@/views/courses/chapters"),
        },
        data: () => ({
            selectedFacultyCollegeYearName: "",
            type: "details",
            course: {
                name: "",
                description: "",
            },
            error: "",
            coverPicture: undefined,
        }),
        computed: {
            ...mapGetters("faculties", ["facultyCollegeYearNames"]),
            selectedFacultyCollegeYearCode() {
                return this.$store.getters["faculties/facultyCollegeYear"](
                    this.selectedFacultyCollegeYearName
                )._id;
            },
        },
        watch: {
            error() {
                console.log(this.error)
            }
        },
        methods: {
            ...mapActions("courses", ["createCourse"]),
            ...mapActions("faculties", ["getFacultyCollegeYears"]),
            validate() {
                if (this.course.name === "") {
                    return this.error = 'name is required'
                } else if (this.course.name.length < 3) {
                    return this.error = 'name is too short'
                }
                if (this.selectedFacultyCollegeYearName === "") {
                    return this.error = 'student_group is required'
                }
                if (this.course.description === "") {
                    return this.error = 'description is required'
                } else if (this.course.description.length < 10) {
                    return this.error = 'description is too short'
                }
                this.saveCourse()
            },
            pickfile() {
                document.getElementById("picture").click();
            },
            handleFileUpload() {
                this.coverPicture = this.$refs.file.files[0];
            },
            saveCourse() {
                this.createCourse({
                    course: {
                        name: this.course.name,
                        user: this.$store.state.user.user.user_name,
                        description: this.course.description,
                        faculty_college_year: this.selectedFacultyCollegeYearCode,
                    },
                    coverPicture: this.coverPicture,
                }).then(() => {
                    this.type = "chapters";
                });
            },
        },
        created() {
            this.getFacultyCollegeYears();
        },
    };
</script>

<style>
    .ProseMirror:focus {
        outline: none;
    }
</style>