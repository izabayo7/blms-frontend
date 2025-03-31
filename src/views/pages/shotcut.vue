<template>
  <v-card color="shotcut">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 shotcut--text">Kurious-Shotcut</h1>
    </v-card-title>
    <v-textarea class="course-description mb-4" cols="60" rows="2"></v-textarea>
    <v-tabs v-model="tab" background-color="transparent" color="shotcut" grow>
      <v-tab v-for="(item, i) in tabs" :key="i" @click="getEssentials(item.tab)">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in tabs" :key="i">
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col class="col-4 left-panel">
                <v-list shaped>
                  <v-list-item-group id="studentAttendance" color="primary">
                    <v-list-item
                      v-for="(subItem, i) in activeItems"
                      :key="i"
                      two-line
                      @click="switchMethods(item.tab,subItem)"
                    >
                      <v-list-item-avatar :color="subItem.profile || subItem.logo ? '' : 'green'">
                        <img
                          v-if="subItem.profile || subItem.logo"
                          :src="`http://localhost:7070/kurious/file/${ item.tab === 'COLLEGE' ? 'collegeLogo' : item.tab === 'SUPER ADMIN' ? 'superAdminProfile' : item.tab === 'ADMIN' ? 'adminProfile' : item.tab === 'INSTRUCTOR' ? 'instructorProfile' : 'studentProfile'}/${subItem._id}`"
                        />

                        <span
                          v-else
                          class="white--text"
                        >{{ computText(subItem.name === undefined ? `${subItem.surName} ${subItem.otherNames}`: subItem.name) }}</span>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-if="item.tab === 'COLLEGE'"
                          v-text="`${subItem.name}`"
                        />
                        <v-list-item-title
                          v-if="item.tab !== 'COLLEGE'"
                          v-text="`${subItem.surName} ${subItem.otherNames}`"
                        />
                        <v-list-item-subtitle
                          v-if="item.tab !== 'COLLEGE'"
                          class="font-weight-bold mt-2"
                          color="#0000"
                          v-text="subItem.gender"
                        />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

                <span
                  v-if="activeItems.length === 0"
                >There is no {{item.tab}} registered please register one</span>
                <v-btn v-if="currentMethod !== 'INSERT'" rounded @click="addItem(item.tab)">
                  <v-icon>mdi-plus</v-icon>
                  ADD {{ item.tab }}
                </v-btn>
              </v-col>
              <v-col class="col-8 px-12">
                <v-row
                  v-if="item.tab === 'SUPER ADMIN' || item.tab === 'ADMIN' || item.tab === 'STUDENT' || item.tab === 'INSTRUCTOR'"
                  class="generalInfo"
                >
                  <v-col :class="`col-12 input-holder`">
                    <div>
                      <h4>Sur Name</h4>
                      <v-text-field
                        v-model="selectedUser.surName"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />
                    </div>
                    <div>
                      <h4>Other Names</h4>
                      <v-text-field
                        v-model="selectedUser.otherNames"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />
                    </div>
                    <div>
                      <h4>National Id</h4>
                      <v-text-field
                        v-model="selectedUser.nationalId"
                        class="profile-input"
                        type="number"
                        solo
                        required
                      />
                    </div>
                    <div>
                      <h4>Email</h4>
                      <v-text-field
                        v-model="selectedUser.email"
                        class="profile-input"
                        type="email"
                        solo
                        required
                      />
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <v-text-field
                        v-model="selectedUser.phone"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />
                    </div>
                    <div>
                      <h4>Gender</h4>
                      <v-select
                        v-model="selectedUser.gender"
                        class="profile-input"
                        :items="sexes"
                        type="email"
                        solo
                        required
                      />
                    </div>
                  </v-col>
                  <v-col v-if="item.tab !== 'SUPER ADMIN'">
                    <h4>College</h4>
                    <v-select
                      v-model="selectedUser.college"
                      class="profile-input"
                      :items="(item.tab === 'ADMIN' && currentMethod === 'INSERT') ? availableCollegeNames : collegeNames"
                      type="email"
                      solo
                      required
                      :disabled="currentMethod !== 'INSERT'"
                    />
                  </v-col>
                  <v-col v-if="item.tab === 'STUDENT'">
                    <h4>Birth Date</h4>
                    <v-date-picker
                      v-model="selectedUser.DOB"
                      class="profile-input"
                      type="date"
                      solo
                      required
                    />
                  </v-col>
                  <v-col v-if="currentMethod !== 'INSERT'" cols="6">
                    <v-btn
                      color="#FFD248"
                      class="white--text mt-6 ml-4 px-12 py-7"
                      @click="pickfile(item.tab)"
                    >Choose Profile</v-btn>
                    <input type="file" id="picture" hidden @change="handleFileUpload(item.tab)" />
                  </v-col>
                  <v-col
                    v-if="message.length > 0"
                    :class="`col-12 text-center title white--text ${message.includes('successfully') ? 'green' : 'red'}`"
                  >{{message}}</v-col>
                  <v-col class="col-6 mx-auto">
                    <v-btn
                      color="#3CE970"
                      class="white--text mt-6 ml-4 px-16 py-7"
                      @click="currentMethod === 'INSERT' ? insertUser(item.tab) : updateUser(item.tab)"
                    >{{ currentMethod + ' ' + item.tab}}</v-btn>
                  </v-col>
                  <v-col v-if="currentMethod === 'UPDATE'" class="col-6 mx-auto">
                    <v-btn
                      color="red"
                      class="white--text mt-6 ml-4 px-16 py-7"
                      @click="deleteItem(item.tab)"
                    >{{ 'DELETE ' + item.tab}}</v-btn>
                  </v-col>
                </v-row>
                <v-row v-else-if="item.tab === 'COLLEGE'" class="generalInfo">
                  <v-col :class="`col-${currentMethod === 'INSERT' ? '12' : '6'} input-holder`">
                    <div>
                      <h4>Name</h4>
                      <v-text-field
                        v-model="selectedCollege.name"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />
                    </div>
                    <div>
                      <h4>Email</h4>
                      <v-text-field
                        v-model="selectedCollege.email"
                        class="profile-input"
                        type="email"
                        solo
                        required
                      />
                    </div>
                  </v-col>
                  <v-col v-if="currentMethod !== 'INSERT'" cols="6">
                    <v-btn
                      color="#FFD248"
                      class="white--text mt-6 ml-4 px-12 py-7"
                      @click="pickfile(item.tab)"
                    >Choose logo</v-btn>
                    <input type="file" id="picture1" hidden @change="handleFileUpload(item.tab)" />
                  </v-col>
                  <v-col
                    v-if="message.length > 0"
                    :class="`col-12 text-center title white--text ${message.includes('successfully') ? 'green' : 'red'}`"
                  >{{message}}</v-col>
                  <v-col class="col-6 mx-auto">
                    <v-btn
                      color="#3CE970"
                      class="white--text mt-6 ml-4 px-16 py-7"
                      @click="currentMethod === 'INSERT' ? insertCollege() : updateCollege()"
                    >{{ currentMethod + ' ' + item.tab}}</v-btn>
                  </v-col>
                  <!-- <v-col v-if="currentMethod === 'UPDATE'" class="col-6 mx-auto">
                    <v-btn
                      color="red"
                      class="white--text mt-6 ml-4 px-16 py-7"
                      @click="deleteItem(item.tab)"
                    >{{ 'DELETE ' + item.tab}}</v-btn> 
                  </v-col>-->
                </v-row>
                <div v-else-if="item.tab === 'MORE'">biracyaza</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import axios from "axios";
import Apis from "@/services/apis";

export default {
  name: "Home",
  data: () => ({
    tab: null,
    availableCollegeNames: [],
    collegeNames: [],
    collegeCodes: [],
    activeIndex: undefined,
    activeItems: [],
    message: "could not reach the backend",
    sexes: ["Male", "Female"],
    currentMethod: "INSERT",
    tabs: [
      { tab: "SUPER ADMIN" },
      { tab: "COLLEGE" },
      { tab: "ADMIN" },
      { tab: "INSTRUCTOR" },
      { tab: "STUDENT" },
    ],
    selectedCollege: {
      name: "",
      email: "",
    },
    selectedUser: {
      surName: "",
      otherNames: "",
      email: "",
      nationalId: 0,
      phone: "",
      gender: "",
      college: "",
    },
  }),
  beforeMount() {
    this.getEssentials("SUPER ADMIN");
  },
  watch: {
    currentMethod() {
      this.message = "";
    },
  },
  methods: {
    addItem(currentTab) {
      if (currentTab === "COLLEGE") {
        this.selectedCollege = {
          name: "",
          email: "",
        };
      } else {
        this.selectedUser = {
          surName: "",
          otherNames: "",
          email: "",
          nationalId: 0,
          phone: "",
          gender: "",
          college: "",
        };
      }
      this.currentMethod = "INSERT";
    },
    switchMethods(currentTab, details) {
      if (
        currentTab === "COLLEGE" &&
        this.selectedCollege.email !== details.email
      ) {
        this.selectedCollege = {
          id: details._id,
          name: details.name,
          email: details.email,
        };
        this.currentMethod = "UPDATE";
      } else if (this.selectedUser.email !== details.email) {
        this.selectedUser = {
          id: details._id,
          surName: details.surName,
          otherNames: details.otherNames,
          email: details.email,
          nationalId: details.nationalId,
          phone: details.phone,
          gender: details.gender,
          DOB: details.DOB,
          college:
            details.college !== undefined
              ? this.collegeNames[this.collegeCodes.indexOf(details.college)]
              : undefined,
        };
        this.currentMethod = "UPDATE";
      } else {
        if (currentTab === "COLLEGE") {
          this.selectedCollege = {
            name: "",
            email: "",
          };
        } else {
          this.selectedUser = {
            surName: "",
            otherNames: "",
            email: "",
            nationalId: 0,
            phone: "",
            gender: "",
            college: "",
          };
        }
        this.currentMethod = "INSERT";
      }
    },
    async getEssentials(type) {
      this.message = "";
      this.collegeNames = [];
      this.collegeCodes = [];
      this.availableCollegeNames = [];
      this.currentMethod = "INSERT";
      if (type !== "COLLEGE" && type !== "SUPER ADMIN") {
        this.getEssentials("COLLEGE");
      }
      const users = await Apis.get(
        `${
          type === "SUPER ADMIN"
            ? "superAdmin"
            : type === "ADMIN"
            ? "admin"
            : type === "INSTRUCTOR"
            ? "instructor"
            : type === "STUDENT"
            ? "student"
            : type === "COLLEGE"
            ? "college"
            : ""
        }`
      );
      if (users.data.includes("not") || users.data.includes("empty")) {
        this.activeItems = []
        this.message = users.data
      } else {
        this.activeItems = users.data;
        if (type === "COLLEGE" && this.activeItems.length > 0) {
          for (const college of this.activeItems) {
            this.collegeNames.push(college.name);
            this.collegeCodes.push(college._id);
            this.availableCollegeNames.push(college.name);
          }
        }
        if (type === "ADMIN") {
          for (const admin of this.activeItems) {
            const index = this.collegeCodes.indexOf(admin.college);
            this.availableCollegeNames.splice(
              this.collegeNames.indexOf(index),
              1
            );
          }
          console.log(this.collegeNames);
        }
        this.addItem(type);
      }
    },
    async insertUser(type) {
      this.message = "";
      this.selectedUser.college = this.collegeCodes[
        this.collegeNames.indexOf(this.selectedUser.college)
      ];
      const newUser = await Apis.create(
        `${
          type === "SUPER ADMIN"
            ? "superAdmin"
            : type === "ADMIN"
            ? "admin"
            : type === "INSTRUCTOR"
            ? "instructor"
            : type === "STUDENT"
            ? "student"
            : ""
        }`,
        this.selectedUser
      );
      if (newUser.data._id) this.activeItems.push(newUser.data);
      else this.message = newUser.data;
    },
    async insertCollege() {
      this.message = "";
      const newCollege = await Apis.create("college", this.selectedCollege);
      if (newCollege.data._id) this.activeItems.push(newCollege.data);
      else this.message = newCollege.data;
    },
    computText(name) {
      let text = "";
      const forbiden = ["and", "of"];
      name.split(" ").forEach((val) => {
        if (!forbiden.includes(val)) text += val.substring(0, 1).toUpperCase();
      });

      return text;
    },
    pickfile(type) {
      document.getElementById(`${type === 'COLLEGE' ? 'picture1' : 'picture'}`).click();
    },
    handleFileUpload(type) {
      console.log(document.getElementById("picture").files)
      if (type === "COLLEGE") {
        this.selectedCollege.logo = document.getElementById("picture1").files[0];
      } else {
        this.selectedUser.profile = document.getElementById("picture").files[0];
      }
    },
    async updateCollege() {
      const updatedcollege = await Apis.update(
        "college",
        this.selectedCollege.id,
        { name: this.selectedCollege.name, email: this.selectedCollege.email }
      );
      if (updatedcollege.data._id) {
        if (this.selectedCollege.logo) {
          const formData = new FormData();
          formData.append("file", this.selectedCollege.logo);
          const response = await axios.put(
            `http://localhost:7070/kurious/file/UpdateCollegeLogo/${this.selectedCollege.id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response.data._id) {
            this.selectedCollege.logo = response.data.logo;
          } else {
            this.message = response.data;
          }
        }
        if (this.message === "") {
          this.message = `${this.selectedCollege.name} was successfully updated`;
          setTimeout(() => {
            this.getEssentials("COLLEGE");
          }, 2000);
        }
      } else {
        this.message = updatedcollege.data;
      }
    },
    async updateUser(type) {
      const updatedUser = await Apis.update(
        type === "SUPER ADMIN"
          ? "superAdmin"
          : type === "ADMIN"
          ? "admin"
          : type.toLowerCase(),
        this.selectedUser.id,
        {
          surName: this.selectedUser.surName,
          otherNames: this.selectedUser.otherNames,
          email: this.selectedUser.email,
          nationalId: this.selectedUser.nationalId,
          phone: this.selectedUser.phone,
          gender: this.selectedUser.gender,
          college: this.collegeCodes[
            this.collegeNames.indexOf(this.selectedUser.college)
          ],
          DOB: this.selectedUser.DOB,
        }
      );
      if (updatedUser.data._id) {
        if (this.selectedUser.profile) {
          const formData = new FormData();
          formData.append("file", this.selectedUser.profile);
          const response = await axios.put(
            `http://localhost:7070/kurious/file/Update${
              type === "SUPER ADMIN"
                ? "SuperAdmin"
                : type === "ADMIN"
                ? "Admin"
                : type === "INSTRUCTOR"
                ? "Instructor"
                : "Student"
            }Profile/${this.selectedUser.id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (response.data._id) {
            this.selectedUser.profile = response.data.profile;
          } else {
            this.message = response.data;
          }
        }
        if (this.message === "") {
          this.message = `${this.selectedUser.surName} ${this.selectedUser.otherNames} was successfully updated`;
          setTimeout(() => {
            this.getEssentials(type);
          }, 2000);
        }
      } else {
        this.message = updatedUser.data;
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    },
    async deleteItem(type) {
      const deletedUser = await Apis.delete(
        type === "SUPER ADMIN"
          ? "superAdmin"
          : type === "ADMIN"
          ? "admin"
          : type.toLowerCase(),
        type === "COLLEGE" ? this.selectedCollege.id : this.selectedUser.id
      );
      if (deletedUser.data.includes("deleted")) {
        this.message = deletedUser.data;
        setTimeout(() => {
          this.addItem(type);
          this.getEssentials(type);
        }, 2000);
      } else {
        this.message = deletedUser.data;
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* Helper classes */
.shotcut {
  background-color: #f8f8f8 !important;
}
.shotcut--text {
  color: #1d1a1ab3 !important;
}
.col-4.left-panel.col {
  /* padding: 0; */
  border-right: 5px solid #5e5c5c;
  /* margin: 0; */
}
.col.col-12.input-holder {
  display: grid;
  grid-template-columns: auto auto;
}
</style>