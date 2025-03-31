<template>
  <v-app>
      <v-row class="new-class-form ml-10 mt-10">
          <form>
              <h1 class="d-block">CREATE NEW COURSE</h1>
              <div class="new-class-btns mb-5">
                <v-btn rounded text color="#000" dark :class="`details-btn ${type=='details' ? 'new-active-btn' : ''}`" @click="type='details'">Course Details</v-btn>
                <v-btn rounded text color="#000" dark :class="`chapters-btn ${type=='chapters' ? 'new-active-btn' : ''}`" @click="type='chapters'">Course Chapters</v-btn>
              </div>
              <div v-if="type=='details'">
                <h3>Course Name</h3>
                <v-text-field
                    v-model="course.name"
                    required
                    placeholder="Type course name..."
                    outlined
                    class="course-input"
                ></v-text-field>
                <h3>Student Group</h3>
                <v-select
                    v-model="course.group"
                    :items="course.group"
                    chips
                    multiple
                    outlined
                    class="group-select"
                ></v-select>
                <h3>Course Description</h3>
                <textarea v-model="course.description" class="course-description mb-4" cols="60" rows="8"></textarea>
                <h3>Course Cover Image</h3>
                <v-btn
                    rounded
                    color="#ffd248"
                    class="white--text course-image mt-4 mb-6 d-block"
                    @click="pickfile()"
                >
                    <v-icon>mdi-arrow-expand-up</v-icon>
                    Upload Image
                </v-btn>
                <input
                    ref="file"
                    type="file"
                    id="picture"
                    hidden
                    @change="handleFileUpload()"
                >
                <v-btn rounded color="#3CE970" class="mb-6" @click="type='chapters'">Next</v-btn>
              </div>
              <div v-if="type=='chapters'" class="class-chapters">
                    <v-row>
                        <v-col class="col-12 col-md-4">
                            <div v-for="(chapter, i) in course.chapters" :key="i" class="chapters-div">
                                <v-btn color="#f5f5f5" class="active-chapter" @click="activeChapter=i">chapter {{chapter.number}}</v-btn>
                                <v-icon v-if="activeChapter !== i" color="red" @click="removeChapter(i)">mdi-close</v-icon>
                            </div>
                            <v-btn @click="addChapter()"><v-icon>mdi-plus</v-icon>New Chapter</v-btn>
                        </v-col>
                        <v-col class="col-12 col-md-8">
                            <h4>Name</h4>
                            <v-text-field
                                v-model="course.chapters[activeChapter].name"
                                placeholder="Enter Chapter Name"
                                class="chapter-name"
                                solo
                            >
                            </v-text-field>
                            <h4>Description</h4>
                            <textarea v-model="course.chapters[activeChapter].description" class="course-description mb-4" cols="40" rows="6"  placeholder="Course Description"></textarea>
                            <!-- <h3>Chapter Sections</h3>
                            <div v-for="section in course.chapters[activeChapter].sections" :key="section.number" class="section-area">
                                <input v-model="section.name" type="text" placeholder="Section Name" class="section-name">
                                <textarea v-model="section.description" placeholder="Section Description" class="section-description"></textarea>
                                <v-icon size="30">mdi-paperclip</v-icon>
                            </div> 
                            <v-btn @click="addSection()" text class=" d-block section-link"><v-icon>mdi-plus</v-icon> Add Section</v-btn>-->
                            <v-btn rounded color="#ffd248" @click="saveChanges()">Save Changes</v-btn>
                        </v-col>
                    </v-row>
              </div>
        </form>
      </v-row>
  </v-app>
</template>

<script>
import axios from 'axios' 
export default {
    name: "NewClass",
    data: () => ({
      activeChapter: 0,
      type: 'details',
      items: ['Year 2 finace', 'Year 1 finance'],
      value: ['Year 2 finace', 'Year 1 finance'],
      course: {
          name: '',
          group: '5f0ab5f7deea002f14fd93a2',
          description: '',
          coverPicture: undefined,
          chapters: [
              {
                  number: 1,
                  name: '',
                  description: '',
                  sections: [
                      {
                          number: 1,
                          name: '',
                          description: '',
                      }
                  ]
              }
          ]
      }
    }),
    methods:{
      pickfile () {
        document.getElementById('picture').click()
      },
      handleFileUpload () {
        this.course.coverPicture = this.$refs.file.files[0]
      },
      addChapter(){
          this.course.chapters.push({
                number: this.course.chapters.length+1,
                name: '',
                description: '',
                sections: [
                    {
                        number: 1,
                        name: '',
                        description: '',
                    }
                ]
            })
      },
      addSection(){
          this.course.chapters[this.activeChapter].sections.push({
                        number: this.course.chapters[this.activeChapter].sections.length+1,
                        name: '',
                        description: '',
                    })
      },
      removeChapter(index){
          this.course.chapters.splice(index,1)
          if (this.activeChapter !== 0){
            this.activeChapter --
          }
          for (const chapter of this.course.chapters) {
            if (chapter.number > 1) {
              chapter.number -= 1
            }
          }
      },
      async saveChanges() {

          const formData = new FormData()
          formData.append('name', this.course.name)
          formData.append('facilityCollegeYear', this.course.group)
          formData.append('description', this.course.description)
          formData.append('instructor', this.$store.state.user._id)
          if (this.course.coverPicture) {
            formData.append('coverPicture', this.course.coverPicture)
          }
          const course = await axios.post(`http://192.168.8.100:7070/kurious/course`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          // message needed
          if (course.data._id){
            for (const chapter of this.course.chapters) {
              const formData = new FormData()
              formData.append('name', course.data._id)
              formData.append('course', '5f0b9e6265ebec2a5c996bda')
              formData.append('description', chapter.description)
              const response = await axios.post(`http://192.168.8.100:7070/kurious/chapter`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
              // message needed
              alert(response.data)
            }
          } else {
            alert('error occured')
          }
      }
    }
}
</script>

<style>

</style>