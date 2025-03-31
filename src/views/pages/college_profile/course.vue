<template>
  <v-container fluid class="ma-0 pa-0">
    <div id="schoolProfile">
      <div class="top">
        <div class="logo d-flex justify-center mt-4">
          <img :src="college.logo" alt="" />
        </div>
        <div class="navigation d-md-flex hidden-sm-and-down">
          <button
            v-for="(link, i) in navigationState"
            :key="link.name"
            @click="i > navigationState - 1 ? goBack(i) : undefined"
          >
            {{ link.name }}
            <svg
              v-if="navigationState.length > i + 1"
              class="mx-2"
              width="8"
              height="11"
              viewBox="0 0 8 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 10L6 5.23529L0.999999 1"
                stroke="black"
                stroke-width="2.1"
              />
            </svg>
          </button>
        </div>
        <div class="buttons">
          <button @click="goBack(navigationState.length - 1)">
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5098 1L1 8.41177L9.5098 15"
                stroke="white"
                stroke-width="1.09804"
              />
            </svg>
            <div>Back</div>
          </button>
          <button>
            <svg
              width="26"
              height="29"
              viewBox="0 0 26 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect width="26" height="29" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_4436_283"
                    transform="translate(0 0.0517241) scale(0.0104167 0.00933908)"
                  />
                </pattern>
                <image
                  id="image0_4436_283"
                  width="96"
                  height="96"
                  xlink:href="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <div>Login</div>
          </button>
        </div>
        <div class="navigation d-sm-flex hidden-md-and-up">
          <button
            v-for="(link, i) in navigationState"
            :key="link.name"
            @click="i > navigationState - 1 ? goBack(i) : undefined"
          >
            {{ link.name }}
            <svg
              v-if="navigationState.length > i + 1"
              class="mx-2"
              width="8"
              height="11"
              viewBox="0 0 8 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 10L6 5.23529L0.999999 1"
                stroke="black"
                stroke-width="2.1"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="routeContent-container">
        <div v-if="navigationState.length === 2" class="routeContent">
          <div
            class="course-details mx-auto"
            :style="
              selectedCourse.coverPicture
                ? `background-image: url(${selectedCourse.coverPicture});`
                : ''
            "
          >
            <div class="bg-one"></div>
            <div class="bg-two"></div>
            <div class="absolute">
              <div class="">
                <div class="d-flex content-container">
                  <div class="details">
                    <div class="hidden-md-and-up d-flex d-md-none">
                      <div class="course-name">{{ selectedCourse.name }}</div>
                      <div
                        v-if="selectedCourse.haveCertificate"
                        class="
                          certificate
                          ml-auto
                          d-flex
                          align-center
                        "
                      >
                        <svg
                          width="46"
                          height="46"
                          viewBox="0 0 46 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <rect width="46" height="46" fill="url(#pattern10)" />
                          <defs>
                            <pattern
                              id="pattern10"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlink:href="#image0_4436_440"
                                transform="scale(0.0104167)"
                              />
                            </pattern>
                            <image
                              id="image0_4436_440"
                              width="96"
                              height="96"
                              xlink:href="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>

                        <div>Impamyabumenyi</div>
                      </div>
                    </div>
                    <div class="course-name">{{ selectedCourse.name }}</div>
                    <div class="language">{{ selectedCourse.language }}</div>
                    <div class="category">{{ selectedCourse.category }}</div>
                    <div class="description">
                      {{ selectedCourse.description }}
                    </div>
                    <div class="price d-flex align-center">
                      <div>{{ selectedCourse.price }}</div>
                      <div class="d-flex justify-center align-center">
                        Internet ni ubuntu
                      </div>
                    </div>
                    <div class="action">
                      <button
                        @click="
                          goForward({
                            name: 'Registration',
                          })
                        "
                      >
                        Iyandikishe
                      </button>
                    </div>
                    <div
                      v-if="selectedCourse.haveCertificate"
                      class="certificate d-md-flex align-center hidden-sm-and-down"
                    >
                      <svg
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <rect width="46" height="46" fill="url(#pattern101)" />
                        <defs>
                          <pattern
                            id="pattern101"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlink:href="#image0_4436_440"
                              transform="scale(0.0104167)"
                            />
                          </pattern>
                          <image
                            id="image0_4436_440"
                            width="96"
                            height="96"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAGTUlEQVR4nO2d26sVVRzHvyvKG0e09KRWhlreL0VesutLkEFBGPRSvUhQEETUiz7lKYl88j0oe+kv6CkEMzTzhnTSTLx1jGOl2M2SEo0+PawZ2m33nr1n9m/WzOwzH9gvnr1/l+9v1m8ua81SqqmpqampqampqampqQDAJGAb8GP02QZMKjquMQEwBdjL9XwOTCk6vr4GmArsbyF+zGFgWtFx9iXAIDCcIH7Ml8Bg0fH2FcAM4EgX4sccB24rOu5ucEU4BaZLelrSFEkjkk5LOuOc+7PFd2dL2ilpfko3JyU95pw718LmJEl3S7pL0lxJv0n62Dn3U0ofPRO8AMBaSTskTW7x5+/lixF/RiVtkRcpC99KelPSbHnB48/tLb77u6R1zrn9GX1loogCDEu6J7TfLjnqnFsR0mHQAgBz5FtOmZnrnDsbytkNoRxFlPXIb2R5SGehCxA0uYzUBSiYZSGd1QW4nqAxBjsJA+MlXZZ0YyifGbkmacA5dzWEs5AjYLHKL74k3SRpYShnIQtQhfYTEyzWIAWIrv83hPBlxItRzNUGmA5sBf5K8SCtLFwF3gNmFq1jaoABYCNwqVAJbbiMP4imFq1rR4BxwEvA+UIly4ef8QfVREvNzC5DgUclfST/5LGfGZX0gnNut4UxkwIAcyUdlzTewl4FuCJpkXPuu14NWV0FPaexI74kTZDPuWesCjDByE6VMDngrArwiZGdKrHDwohJAZxzeyXtsbBVEfY5576wMGR5J/yOoa2yM2RlyPRpKLBX0oOWNkvIAefcWitj1s+C3jW2V0a2WBoznw8ADklaZW23JAxLus85h5XBPJ6G9vMoeNtSfCmfEeDkj5Sg62sC8I2k5c65fyyNhp4TrmkijwKsV/8d/ZK0RH49qyn1STgd5T4JA0+pf8WXpHslPWlpsL4RS89hSautRoHZCADWqf/Fl6SVkh63MmY5I7Zb0iNW9krOPuecycFmMgKAhzR2xJekB4CHLQxZtaAnjOxUCZM2ZFWAK0Z2qoRJzlaT8nPkJ+XHytTkFUmLLd6ksZoROys/JEct7JWcc/Iv85m8xmR2Geqc2yP/BuLLki5Y2S0Rv0jaJGmB1Zqg3KBemlgO6I/FubOK1rFngDnAzmL1TMUu/Gq/3AkyHxCdsLaH8GXEdudckPeZQ07IHA3oq1eCxRryJb1xkv6QNC6Uz4z8LWmycy7IzWWwERC9dXgqlL8eOBVKfMl+QmYzsCbhK0cs/eVE2/YDrAE2WzqznA8Ykl+ytzLha8es/OVIUv9fJWkI2GrlzOpx9JCk+MhIetW/CifipBjj3DZaFqEngKGma+i2t+n4+4GyMy8h/t1N3zVbpJsJrhcf4Ff84qx2v+lm472iSByh+NyaKWYk0Fr8mAUJv7uf9s+IzgGfAe8Dm4DngTPZ9WQksrEpsrkLGG3z3Uv47dTaxb0wwU/YkUCy+ACvdPj9NGAD8AawHlhBm51vgTuAE10K3sgp4M42NicCyyPfr0exJO43CrzawV+YInQhPvg2Yznhn2XbylYb82X17/D7kXYi33bUpfgxzxj7HuxShK+AW419P5si73xGQkrxAS4AM4xjuBk4mODzEHCLsc9ZwMWUudsWIYP4McP4TVotYxkAPm3h62AO4g+SrvU1YtOOyC5+zAlgtUkw/8UUb1//Q/Qx374e/9jhZI+59zYS6F38mKvAB8DSDv7iq5O02xR3k8v8yHbiZhvAMuBD4JpR7olFSLphany8YMmIpAOSzsvvzzYovzVx45bCl+XfRjFZeYBfNnNU0kD0T/EWySOSLspvUzZT0lpJeWzU9JZzrvvRgN2RnxXzwpcgp+7OCSUINI9RV5bcOhcBmAe8hv8vQUKTm/gFF+FY5HdJ2mBDFiN38RvyClGEbKInBJ1nMYKJ35BPHkWwFT0heMtiBBe/IQ+LIoQRPSGJY1UUvyH+XorwddHx95JA4eLHVDoHYFElA28iYxGKaTvNkK4NlU78mJRFKL79xKQIvLTix1QyF7prQ+UJuANdFqEc7SeG5DZUGfFjOhShPO0nJiHgyokfg3/Lpxo50boNlS/QlLQpQrnaTwz/b0OVFz+mqQjlaz8xDW2ob8SPaShCeXMDllL0eskciQ6wxGnVmpqampqabvkXWJKOHTHWEhQAAAAASUVORK5CYII="
                          />
                        </defs>
                      </svg>

                      <div>Impamyabumenyi</div>
                    </div>
                  </div>
                  <div class="video ml-auto">
                    <vue-plyr>
                      <video :src="`${selectedCourse.video}`"></video>
                    </vue-plyr>
                  </div>
                </div>
                <div class="information text-center mx-auto">
                  Iyo uguze iri somo, uryiga kuri murandasi nta interineti uguze
                </div>
              </div>
            </div>
          </div>
          <div class="needed-materials">
            <div class="tittle">Ibyo Ukeneye</div>
            <div class="d-flex">
              <div class="material">
                <svg
                  width="67"
                  height="67"
                  viewBox="0 0 67 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="33.5" cy="33.5" r="33.5" fill="black" />
                  <path
                    d="M39.094 47.4928C38.9291 46.8139 38.317 46.3351 37.6195 46.3384H36.0273C35.8719 46.3319 35.7516 46.2021 35.7516 46.0496V43.7697H42.2399V41.5498H18.0019C17.8435 41.553 17.7102 41.4262 17.7073 41.2642V41.2613V22.0084C17.7073 21.85 17.8373 21.72 17.9957 21.72C17.999 21.72 17.999 21.72 18.0019 21.72H48.6713C48.8297 21.72 48.9597 21.8468 48.963 22.0055V22.0084V29.572H49.6924V21.72C49.6924 21.3237 49.3688 21 48.9692 21C48.9662 21 48.9662 21 48.963 21H17.7073C17.3139 21.0065 17 21.3298 17 21.72V43.0465C17 43.4399 17.3139 43.7602 17.7073 43.7697H30.9376V46.0496C30.9376 46.2083 30.8075 46.3384 30.6491 46.3384C30.6458 46.3384 30.6458 46.3384 30.6426 46.3384H29.0507C28.3594 46.3446 27.76 46.8204 27.5951 47.4928C27.557 47.648 27.6522 47.8034 27.8076 47.8416C27.8298 47.8478 27.8487 47.851 27.8709 47.851H38.8212C38.98 47.8478 39.1067 47.7148 39.1035 47.5561C39.1035 47.5339 39.1035 47.515 39.0973 47.4928H39.094Z"
                    fill="white"
                  />
                  <path
                    d="M44.3818 30.6281H46.31C46.3514 30.9104 46.5955 31.1164 46.8778 31.1196H49.2593C49.5416 31.1164 49.7857 30.9104 49.8268 30.6281H51.755C52.1452 30.6281 52.4623 30.9452 52.4623 31.3354V47.0424C52.4623 47.4326 52.1452 47.7497 51.755 47.7497H44.3818C43.9949 47.7497 43.6748 47.4326 43.6748 47.0424V31.3354C43.6748 30.9452 43.9949 30.6281 44.3818 30.6281ZM44.3818 30.3775C43.8521 30.3742 43.4209 30.7992 43.418 31.3289C43.418 31.3321 43.418 31.3354 43.418 31.3354V47.0424C43.418 47.5688 43.8459 48 44.3788 48C44.3788 48 44.3788 48 44.3818 48H51.755C52.2847 48.0033 52.7159 47.5783 52.7191 47.0486C52.7191 47.0457 52.7191 47.0424 52.7191 47.0424V31.3354C52.7191 30.8087 52.2909 30.3775 51.7612 30.3775C51.7612 30.3775 51.7583 30.3775 51.755 30.3775H44.3818Z"
                    fill="white"
                  />
                </svg>

                <div>Telephone cg mudasobwa</div>
              </div>
              <div class="material">
                <svg
                  width="67"
                  height="67"
                  viewBox="0 0 67 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="33.5" cy="33.5" r="33.5" fill="black" />
                  <path
                    d="M41.828 34.625V39.5833C41.828 40.3626 41.1908 41 40.4117 41H23.4163C22.6374 41 22 40.3626 22 39.5833V25.4167C22 24.6374 22.6374 24 23.4163 24H40.4117C41.1908 24 41.828 24.6374 41.828 25.4167V30.375L47.4932 24.7083V40.2917L41.828 34.625Z"
                    fill="white"
                  />
                </svg>

                <div>Telephone cg camera ifata videwo</div>
              </div>
            </div>
            <div class="contact d-flex">
              <div>Duhamagare</div>
              <div>{{ college.phone }}</div>
            </div>
          </div>
        </div>
        <div v-if="navigationState.length === 3" class="routeContent"></div>
        <div v-if="navigationState.length === 4" class="routeContent"></div>
      </div>
      <div class="testimonials">
        <div class="title">Icyo abaryize barivugaho</div>
        <carousel
          :slides="testimonies"
          :interval="3000"
          indicators
          :alignHorizontally="$vuetify.breakpoint.width > 960"
        ></carousel>
      </div>
      <div class="courses-container">
        <div class="courses-container-content">
          <div class="category">
            <div class="category-name">Andi masomo nka ryo</div>
            <div class="courses row">
              <Course
                v-for="course in sameCourses"
                :key="course.name"
                :course="course"
                :college_id="college.id"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <MyFooter />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "SchoolProfile",
  components: {
    Carousel: () => import("@/components/college_profile/carousel/Carousel"),
    MyFooter: () => import("@/components/college_profile/footer"),
    Course: () => import("@/components/college_profile/course"),
  },
  data() {
    return {
      college: {
        banner: "https://i.ibb.co/sHhk01j/Rectangle-2988.png",
        logo: "https://i.ibb.co/2jk5mBD/ibtc-1.png",
        category: "Multimedia School",
        name: "IBTC FILM & DESIGN SCHOOL",
        id: "ibtc",
        motto:
          "You are one click away to update your skillset with our courses. check them out bellow.",
        phone: "+250791257065",
      },
      sameCourses: [
        {
          id: "course981",
          name: "Video Editing & Sound Design",
          language: "English",
          haveCertificate: true,
          coverPicture: "https://i.ibb.co/742qjYk/Rectangle-2994.png",
        },
        {
          id: "course982",
          name: "Script writing",
          language: "English",
          haveCertificate: true,
          coverPicture: "https://i.ibb.co/cFW9Dcp/Rectangle-2992.png",
        },
        {
          id: "course983",
          name: "Camera",
          language: "English",
          haveCertificate: true,
          coverPicture: "https://i.ibb.co/742qjYk/Rectangle-2994.png",
        },
      ],
      testimonies: [
        {
          user_profile: "https://i.ibb.co/sHhk01j/Rectangle-2988.png",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.",
        },
        {
          user_profile: "https://i.ibb.co/sHhk01j/Rectangle-2988.png",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.",
        },
        {
          user_profile: "https://picsum.photos/id/1036/900/400",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.",
        },
        {
          user_profile: "https://picsum.photos/id/1035/900/400",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.",
        },
        {
          user_profile: "https://picsum.photos/id/1037/900/400",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.I love this course. It's very easy to understand and I love it.I love this course. It's very easy to understand and I love it.I love this course. It's very easy to understand and I love it.",
        },
        {
          user_profile: "https://picsum.photos/id/1033/900/400",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.",
        },
        {
          user_profile: "https://picsum.photos/id/1032/900/400",
          user_names: "John Doe",
          course_name: "Web Design",
          content:
            "I love this course. It's very easy to understand and I love it.",
        },
      ],
      navigationState: [],
      selectedCourse: {
        name: "Ubumenyi ngiro",
        language: "English",
        haveCertificate: true,
        category: "Cinematography",
        description:
          "Iri somo rizagufasha  kumenya uko wakoresha camera igihe cyose, guhera kuri telephone ntoya kugeza  kuri camera nini.",
        price: "100,000 RWF",
        coverPicture: "https://i.ibb.co/prdpVDh/Rectangle-2994-1.png",
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    };
  },
  methods: {
    goForward(route) {
      this.navigationState.push(route);
    },
    goBack(index) {
      console.log(index);
      if (index < 2) {
        this.$router.push(this.navigationState[0].path);
      } else if (index > 0) {
        this.navigationState = this.navigationState.slice(0, index);
      }
    },
  },
  watch: {
    $route() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    const el = document.querySelector("title");
    el.innerHTML = this.selectedCourse.name;
    this.navigationState.push({
      name: "Courses",
      path: `/schools/${this.college.id}`,
    });
    this.navigationState.push({
      name: this.selectedCourse.name,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/imports/college_profile";
</style>
