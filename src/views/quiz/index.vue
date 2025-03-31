<template>
  <v-container id="view-quiz" class="round smooth--background" fluid>
    <v-row v-if="userCategory === 'INSTRUCTOR'">
      <v-col class="col-12 mt-4">
        <v-card class="users-table mx-auto pa-4">
          <v-card-title>
            <v-row>
              <div class="col-12 d-flex justify-center">
                <div class="nav d-block d-md-flex">
                  <div class="item cursor-pointer" @click="$router.push('/assessments/quiz')" :class="{active:currentView==='quiz'}">
                    <div class="icon">
                      <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.7384 19.0509C10.3561 19.0996 9.97111 19.1243 9.58571 19.1248C8.05267 19.1242 6.54645 18.7227 5.21654 17.9601C5.12519 17.9075 5.01676 17.8932 4.91487 17.9202L0.96324 18.961L2.02806 15.0573C2.04287 15.0067 2.0475 14.9536 2.04167 14.9011C2.03584 14.8486 2.01967 14.7979 1.9941 14.7517C1.34004 13.6266 0.943936 12.3704 0.834394 11.0736C0.724852 9.77688 0.904601 8.47199 1.36067 7.25315C1.81673 6.03432 2.53773 4.93195 3.47162 4.02563C4.4055 3.11931 5.52897 2.43166 6.76092 2.01231C7.99287 1.59296 9.30256 1.45238 10.5954 1.60072C11.8883 1.74906 13.1322 2.18261 14.2371 2.87008C15.3421 3.55756 16.2806 4.48179 16.985 5.57607C17.6893 6.67035 18.1419 7.90737 18.3101 9.19782C18.326 9.3137 18.338 9.43157 18.35 9.54943C18.3546 9.60191 18.3695 9.65296 18.3938 9.69968C18.4181 9.7464 18.4514 9.78787 18.4918 9.82172C18.5321 9.85558 18.5787 9.88116 18.629 9.897C18.6792 9.91283 18.7321 9.91862 18.7845 9.91403C18.837 9.90944 18.8881 9.89456 18.9348 9.87024C18.9815 9.84592 19.023 9.81263 19.0568 9.77228C19.0907 9.73193 19.1163 9.68531 19.1321 9.63508C19.1479 9.58484 19.1537 9.53198 19.1491 9.47951C19.1371 9.35165 19.1232 9.2218 19.1072 9.09394C18.9207 7.69631 18.4284 6.35699 17.6652 5.17139C16.902 3.98579 15.8867 2.98308 14.6917 2.23469C13.4967 1.4863 12.1514 1.01065 10.7516 0.841618C9.35172 0.672585 7.93183 0.814332 6.59303 1.25676C5.25424 1.69919 4.02948 2.43141 3.00601 3.40127C1.98254 4.37113 1.18554 5.55476 0.671782 6.86784C0.158027 8.18091 -0.0598392 9.59113 0.0337027 10.998C0.127245 12.4049 0.529893 13.7739 1.21296 15.0074L0.0142895 19.4185C-0.00192928 19.4775 -0.00437863 19.5395 0.00713041 19.5996C0.0186394 19.6597 0.0437993 19.7163 0.0806695 19.7652C0.11754 19.814 0.165135 19.8537 0.219784 19.8813C0.274434 19.9088 0.334677 19.9234 0.395868 19.924C0.430326 19.9242 0.464644 19.9195 0.497755 19.91L4.96282 18.7353C6.37896 19.5148 7.96918 19.9237 9.58571 19.924C10.0059 19.9237 10.4256 19.8964 10.8423 19.8421C10.8948 19.8352 10.9454 19.8181 10.9913 19.7918C11.0371 19.7654 11.0774 19.7302 11.1096 19.6883C11.1419 19.6464 11.1656 19.5985 11.1794 19.5474C11.1932 19.4963 11.1968 19.443 11.1899 19.3906C11.1831 19.3381 11.166 19.2875 11.1396 19.2416C11.1133 19.1957 11.0781 19.1555 11.0362 19.1232C10.9942 19.091 10.9464 19.0673 10.8953 19.0535C10.8442 19.0397 10.7909 19.0361 10.7384 19.0429V19.0509Z"
                        />
                        <path
                            d="M9.58792 5.04492C8.84614 5.04492 8.13473 5.33959 7.61021 5.86412C7.08569 6.38864 6.79102 7.10004 6.79102 7.84183C6.79102 7.9478 6.83311 8.04943 6.90804 8.12436C6.98297 8.19929 7.0846 8.24139 7.19057 8.24139C7.29654 8.24139 7.39817 8.19929 7.4731 8.12436C7.54804 8.04943 7.59013 7.9478 7.59013 7.84183C7.59013 7.31198 7.80061 6.80384 8.17527 6.42918C8.54993 6.05452 9.05808 5.84404 9.58792 5.84404C10.1178 5.84404 10.6259 6.05452 11.0006 6.42918C11.3752 6.80384 11.5857 7.31198 11.5857 7.84183C11.5857 8.60698 11.1622 9.06048 10.6248 9.63984C9.98748 10.3351 9.18836 11.1821 9.18836 12.7784C9.18836 12.8843 9.23046 12.986 9.30539 13.0609C9.38032 13.1358 9.48195 13.1779 9.58792 13.1779C9.69389 13.1779 9.79552 13.1358 9.87045 13.0609C9.94539 12.986 9.98748 12.8843 9.98748 12.7784C9.98748 11.4978 10.5868 10.8605 11.2141 10.1812C11.7855 9.56592 12.3848 8.93662 12.3848 7.84582C12.3854 7.47819 12.3134 7.11407 12.1731 6.77427C12.0328 6.43447 11.8268 6.12567 11.567 5.86553C11.3073 5.60539 10.9988 5.39901 10.6592 5.25821C10.3196 5.1174 9.95555 5.04492 9.58792 5.04492Z"
                        />
                        <path
                            d="M10.0357 14.7767C10.0357 14.6877 10.0094 14.6008 9.95997 14.5269C9.91058 14.453 9.84038 14.3954 9.75824 14.3614C9.6761 14.3273 9.58572 14.3184 9.49853 14.3358C9.41133 14.3531 9.33124 14.3959 9.26838 14.4588C9.20551 14.5217 9.1627 14.6018 9.14536 14.689C9.12801 14.7762 9.13691 14.8665 9.17094 14.9487C9.20496 15.0308 9.26257 15.101 9.33649 15.1504C9.41041 15.1998 9.49732 15.2262 9.58622 15.2262C9.70544 15.2262 9.81977 15.1788 9.90407 15.0945C9.98837 15.0102 10.0357 14.8959 10.0357 14.7767Z"
                        />
                        <path
                            d="M23.3805 14.5292L24.0477 13.7301L24.4473 14.0537C24.5189 14.1121 24.6086 14.1439 24.701 14.1436C24.7829 14.143 24.8627 14.1171 24.9294 14.0696C24.9962 14.0221 25.0467 13.9553 25.0742 13.8781C25.1017 13.8009 25.1048 13.7171 25.083 13.6381C25.0613 13.5591 25.0158 13.4887 24.9527 13.4364L23.5343 12.2717C23.4522 12.2047 23.3468 12.173 23.2413 12.1837C23.1358 12.1944 23.0389 12.2465 22.9719 12.3286C22.9049 12.4108 22.8732 12.5161 22.8839 12.6216C22.8946 12.7271 22.9467 12.824 23.0288 12.891L23.4284 13.2246L22.7711 14.0298C21.7214 13.2634 20.4727 12.8166 19.1751 12.7432V11.5325H20.3738C20.4797 11.5325 20.5814 11.4904 20.6563 11.4155C20.7312 11.3406 20.7733 11.2389 20.7733 11.133C20.7733 11.027 20.7312 10.9254 20.6563 10.8504C20.5814 10.7755 20.4797 10.7334 20.3738 10.7334H17.1773C17.0713 10.7334 16.9697 10.7755 16.8948 10.8504C16.8198 10.9254 16.7778 11.027 16.7778 11.133C16.7778 11.2389 16.8198 11.3406 16.8948 11.4155C16.9697 11.4904 17.0713 11.5325 17.1773 11.5325H18.376V12.7432C16.8093 12.8298 15.3208 13.4554 14.1626 14.5139C13.0044 15.5725 12.2477 16.9988 12.0208 18.5514C11.7938 20.1039 12.1106 21.6872 12.9173 23.0329C13.7241 24.3787 14.9713 25.4042 16.4476 25.9356C17.9239 26.4671 19.5385 26.4719 21.0179 25.9492C22.4973 25.4264 23.7506 24.4084 24.5653 23.0674C25.38 21.7265 25.7061 20.1451 25.4884 18.5912C25.2706 17.0374 24.5224 15.6065 23.3705 14.5412L23.3805 14.5292ZM18.7755 25.5171C17.5902 25.5171 16.4314 25.1655 15.4458 24.507C14.4602 23.8484 13.692 22.9124 13.2384 21.8172C12.7848 20.7221 12.6661 19.517 12.8973 18.3544C13.1286 17.1918 13.6994 16.1239 14.5376 15.2857C15.3758 14.4475 16.4437 13.8767 17.6063 13.6455C18.7689 13.4142 19.974 13.5329 21.0691 13.9865C22.1643 14.4401 23.1003 15.2083 23.7589 16.1939C24.4174 17.1795 24.7689 18.3383 24.7689 19.5237C24.7689 21.1132 24.1375 22.6377 23.0135 23.7616C21.8895 24.8856 20.3651 25.5171 18.7755 25.5171Z"
                        />
                        <path
                            d="M20.7544 15.1741C20.7067 15.1523 20.6551 15.1402 20.6026 15.1383C20.5502 15.1365 20.4979 15.145 20.4487 15.1633C20.3996 15.1817 20.3545 15.2096 20.3161 15.2454C20.2777 15.2811 20.2468 15.3241 20.225 15.3719C20.2032 15.4196 20.1911 15.4712 20.1892 15.5236C20.1874 15.5761 20.1959 15.6284 20.2142 15.6775C20.2326 15.7267 20.2605 15.7718 20.2962 15.8102C20.332 15.8485 20.375 15.8795 20.4228 15.9013C21.2139 16.2586 21.8667 16.8644 22.282 17.6266C22.6973 18.3888 22.8525 19.2658 22.7238 20.1243C22.5952 20.9827 22.1898 21.7757 21.5693 22.3827C20.9488 22.9897 20.1471 23.3775 19.286 23.4872C18.4249 23.5969 17.5516 23.4225 16.7987 22.9905C16.0458 22.5585 15.4545 21.8925 15.1147 21.0938C14.7749 20.295 14.7052 19.4071 14.9161 18.5651C15.1271 17.7231 15.6071 16.973 16.2833 16.4287L16.2254 16.6145C16.1942 16.7157 16.2044 16.8252 16.2539 16.9188C16.3033 17.0125 16.3879 17.0826 16.4891 17.1139C16.5273 17.1256 16.567 17.1317 16.607 17.1319C16.6926 17.1318 16.7759 17.1041 16.8446 17.053C16.9133 17.0019 16.9637 16.9302 16.9886 16.8482L17.3562 15.6496C17.3874 15.5484 17.3771 15.4389 17.3277 15.3453C17.2782 15.2516 17.1936 15.1814 17.0924 15.1501L15.8938 14.7825C15.8429 14.7641 15.7887 14.7563 15.7347 14.7595C15.6807 14.7626 15.6279 14.7768 15.5794 14.801C15.531 14.8252 15.488 14.859 15.4531 14.9003C15.4181 14.9416 15.3919 14.9896 15.3761 15.0413C15.3602 15.0931 15.3551 15.1475 15.3609 15.2013C15.3667 15.2551 15.3834 15.3072 15.4099 15.3544C15.4365 15.4015 15.4724 15.4428 15.5153 15.4757C15.5583 15.5086 15.6076 15.5324 15.66 15.5457L15.9917 15.6476C15.1394 16.2615 14.5133 17.1394 14.2105 18.1453C13.9077 19.1511 13.945 20.2287 14.3167 21.2111C14.6884 22.1936 15.3736 23.0261 16.2663 23.5796C17.1591 24.1332 18.2094 24.3769 19.2547 24.273C20.2999 24.1692 21.2818 23.7235 22.0481 23.0051C22.8144 22.2867 23.3225 21.3356 23.4935 20.2992C23.6646 19.2628 23.4891 18.199 22.9943 17.2724C22.4994 16.3459 21.7129 15.6083 20.7564 15.1741H20.7544Z"
                        />
                        <path
                            d="M18.3769 20.6066V20.7624C18.3769 20.8684 18.419 20.97 18.494 21.0449C18.5689 21.1199 18.6705 21.162 18.7765 21.162C18.8825 21.162 18.9841 21.1199 19.059 21.0449C19.134 20.97 19.176 20.8684 19.176 20.7624V20.6066C19.3967 20.5248 19.5871 20.3773 19.7215 20.1841C19.8559 19.9909 19.928 19.7612 19.928 19.5258C19.928 19.2904 19.8559 19.0607 19.7215 18.8675C19.5871 18.6743 19.3967 18.5268 19.176 18.445V15.1466C19.176 15.0407 19.134 14.939 19.059 14.8641C18.9841 14.7892 18.8825 14.7471 18.7765 14.7471C18.6705 14.7471 18.5689 14.7892 18.494 14.8641C18.419 14.939 18.3769 15.0407 18.3769 15.1466V18.445C18.1562 18.5268 17.9659 18.6743 17.8315 18.8675C17.6971 19.0607 17.625 19.2904 17.625 19.5258C17.625 19.7612 17.6971 19.9909 17.8315 20.1841C17.9659 20.3773 18.1562 20.5248 18.3769 20.6066ZM18.7765 19.1722C18.8464 19.1722 18.9148 19.1929 18.9729 19.2318C19.0311 19.2706 19.0764 19.3259 19.1032 19.3905C19.1299 19.4551 19.1369 19.5262 19.1233 19.5948C19.1097 19.6634 19.076 19.7264 19.0265 19.7758C18.9771 19.8253 18.9141 19.859 18.8455 19.8726C18.7769 19.8862 18.7058 19.8792 18.6412 19.8525C18.5766 19.8257 18.5213 19.7804 18.4825 19.7222C18.4436 19.6641 18.4229 19.5957 18.4229 19.5258C18.4229 19.432 18.4601 19.3421 18.5264 19.2757C18.5928 19.2094 18.6827 19.1722 18.7765 19.1722Z"
                        />
                      </svg>
                    </div>
                    <div>Quizzes {{ formated_quiz.length }}</div>
                  </div>
                  <div class="item cursor-pointer" @click="$router.push('/assessments/assignments')"
                       :class="{active:currentView==='assignments'}">
                    <div class="icon">
                      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                          <path
                              d="M13.5664 3.89364C13.9806 3.89364 14.3164 3.54493 14.3164 3.11479C14.3164 2.68464 13.9806 2.33594 13.5664 2.33594C13.1522 2.33594 12.8164 2.68464 12.8164 3.11479C12.8164 3.54493 13.1522 3.89364 13.5664 3.89364Z"
                          />
                          <path
                              d="M23.5528 6.23073C23.5528 5.08368 22.6574 4.1538 21.5528 4.1538H18.7763C18.4059 3.72654 17.9302 3.39962 17.3836 3.23632C16.9231 3.09885 16.5687 2.73084 16.4363 2.25269C16.076 0.95169 14.9214 0 13.5527 0C12.1841 0 11.0296 0.95169 10.6693 2.25256C10.5367 2.7313 10.1815 3.09885 9.72045 3.23677C9.17445 3.4002 8.69913 3.7268 8.32907 4.1538H5.55274C4.44811 4.1538 3.55273 5.08368 3.55273 6.23073V24.9231C3.55273 26.0701 4.44811 27 5.55274 27C10.1444 27 15.7877 27 21.5528 27C22.6575 27 23.5528 26.0701 23.5528 24.9231C23.5528 19.0246 23.5528 13.3765 23.5528 6.23073ZM8.55282 6.21405C8.5597 5.30111 9.1537 4.48721 9.99733 4.23474C10.7917 3.99706 11.4021 3.36333 11.6303 2.5397C11.8751 1.65571 12.6657 1.03847 13.5527 1.03847C14.4398 1.03847 15.2304 1.65571 15.4751 2.5397C15.7034 3.36385 16.3134 3.99738 17.1071 4.23435C17.9582 4.48858 18.5527 5.30955 18.5527 6.23067V7.26914H8.55282V6.21405ZM21.5528 25.9615C16.2119 25.9615 10.8796 25.9615 5.55274 25.9615C5.0013 25.9615 4.55274 25.4957 4.55274 24.9231V6.23073C4.55274 5.65815 5.0013 5.19227 5.55274 5.19227H7.72413C7.616 5.50978 7.5555 5.85059 7.55288 6.20588V8.30767H19.5528V6.23073C19.5528 5.8663 19.4908 5.51737 19.3801 5.19227H21.5528C22.1042 5.19227 22.5528 5.65815 22.5528 6.23073C22.5528 9.19965 22.5527 23.1223 22.5529 24.9231C22.5528 25.4957 22.1043 25.9615 21.5528 25.9615Z"
                          />
                          <path
                              d="M17.7105 12.624L11.7001 18.8656L9.05082 16.1144L8.34375 16.8488L11.7001 20.3342L18.4176 13.3583L17.7105 12.624Z"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="26" height="27" fill="white" transform="translate(0.554688)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>Assignments {{ assignments.length }}</div>
                  </div>
                  <div class="item cursor-pointer" @click="$router.push('/assessments/exams')"
                       :class="{active:currentView==='exams'}">
                    <div class="icon">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                          <path
                              d="M18.307 0H0.761719C0.341047 0 0 0.341047 0 0.761719V25.1865C0 25.6072 0.341047 25.9483 0.761719 25.9483H18.307C18.7277 25.9483 19.0688 25.6072 19.0688 25.1865V0.761719C19.0688 0.341047 18.7277 0 18.307 0ZM17.5453 24.4248H1.52344V1.52344H17.5453V24.4248Z"
                              fill="#193074"/>
                          <path
                              d="M4.01953 9.03017H7.3746C7.79527 9.03017 8.13632 8.68913 8.13632 8.26846V4.92187C8.13632 4.5012 7.79527 4.16016 7.3746 4.16016H4.01953C3.59886 4.16016 3.25781 4.5012 3.25781 4.92187V8.26846C3.25781 8.68913 3.59881 9.03017 4.01953 9.03017ZM4.78125 5.68359H6.61288V7.50674H4.78125V5.68359Z"
                              fill="#193074"/>
                          <path
                              d="M4.01953 15.409H7.3746C7.79527 15.409 8.13632 15.068 8.13632 14.6473V11.3008C8.13632 10.8801 7.79527 10.5391 7.3746 10.5391H4.01953C3.59886 10.5391 3.25781 10.8801 3.25781 11.3008V14.6473C3.25781 15.068 3.59881 15.409 4.01953 15.409ZM4.78125 12.0625H6.61288V13.8856H4.78125V12.0625Z"
                              fill="#193074"/>
                          <path
                              d="M4.01953 21.7879H7.3746C7.79527 21.7879 8.13632 21.4469 8.13632 21.0262V17.6797C8.13632 17.259 7.79527 16.918 7.3746 16.918H4.01953C3.59886 16.918 3.25781 17.259 3.25781 17.6797V21.0262C3.25781 21.4469 3.59881 21.7879 4.01953 21.7879ZM4.78125 18.4414H6.61288V20.2645H4.78125V18.4414Z"
                              fill="#193074"/>
                          <path
                              d="M10.4219 5.68359H15.0455C15.4662 5.68359 15.8072 5.34255 15.8072 4.92188C15.8072 4.5012 15.4662 4.16016 15.0455 4.16016H10.4219C10.0012 4.16016 9.66016 4.5012 9.66016 4.92188C9.66016 5.34255 10.0012 5.68359 10.4219 5.68359Z"
                              fill="#193074"/>
                          <path
                              d="M10.4219 9.03027H15.0455C15.4662 9.03027 15.8072 8.68923 15.8072 8.26855C15.8072 7.84788 15.4662 7.50684 15.0455 7.50684H10.4219C10.0012 7.50684 9.66016 7.84788 9.66016 8.26855C9.66016 8.68923 10.0012 9.03027 10.4219 9.03027Z"
                              fill="#193074"/>
                          <path
                              d="M10.4219 12.0625H15.0455C15.4662 12.0625 15.8072 11.7215 15.8072 11.3008C15.8072 10.8801 15.4662 10.5391 15.0455 10.5391H10.4219C10.0012 10.5391 9.66016 10.8801 9.66016 11.3008C9.66016 11.7215 10.0012 12.0625 10.4219 12.0625Z"
                              fill="#193074"/>
                          <path
                              d="M10.4219 15.4092H15.0455C15.4662 15.4092 15.8072 15.0681 15.8072 14.6475C15.8072 14.2268 15.4662 13.8857 15.0455 13.8857H10.4219C10.0012 13.8857 9.66016 14.2268 9.66016 14.6475C9.66016 15.0681 10.0012 15.4092 10.4219 15.4092Z"
                              fill="#193074"/>
                          <path
                              d="M10.4219 18.4414H15.0455C15.4662 18.4414 15.8072 18.1004 15.8072 17.6797C15.8072 17.259 15.4662 16.918 15.0455 16.918H10.4219C10.0012 16.918 9.66016 17.259 9.66016 17.6797C9.66016 18.1004 10.0012 18.4414 10.4219 18.4414Z"
                              fill="#193074"/>
                          <path
                              d="M10.4219 21.7881H15.0455C15.4662 21.7881 15.8072 21.447 15.8072 21.0264C15.8072 20.6057 15.4662 20.2646 15.0455 20.2646H10.4219C10.0012 20.2646 9.66016 20.6057 9.66016 21.0264C9.66016 21.447 10.0012 21.7881 10.4219 21.7881Z"
                              fill="#193074"/>
                          <path
                              d="M23.4403 0.0517578C22.0301 0.0517578 20.8828 1.19906 20.8828 2.60925V21.5588C20.8828 21.6747 20.9093 21.7891 20.9602 21.8932L22.7582 25.5727C22.886 25.8342 23.1516 26 23.4426 26C23.7336 26 23.9992 25.8342 24.127 25.5727L25.925 21.8932C25.9759 21.7891 26.0024 21.6747 26.0024 21.5588V2.6092C26.0024 1.19901 24.8551 0.0517578 23.4403 0.0517578ZM22.4063 4.47435H24.4789V18.6148H22.4063V4.47435ZM23.4449 1.5752C24.0151 1.5752 24.4789 2.03908 24.4789 2.60925V2.95096H22.4063V2.60925C22.4063 2.03903 22.8701 1.5752 23.4449 1.5752ZM24.4789 21.3826L23.4426 23.5034L22.4063 21.3826V20.1383H24.4789V21.3826Z"
                              fill="#193074"/>
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="26" height="26" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>

                    </div>
                    <div>Exams {{ exams.length }}</div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    id="searchQuiz"
                    single-line
                    hide-details
                />
              </div>
              <div class="col-6">
                <div class="text-right">
                  <button @click="$router.push(`${$route.path}/new`)"
                          class="create">
                    New {{currentView === 'quiz' ? 'quiz' : currentView === 'exams' ? 'exam' : 'assignment'}}
                  </button>
                </div>
              </div>
            </v-row>
          </v-card-title>
          <v-data-table
              v-if="currentView === 'quiz'"
              :search="search"
              :headers="headers"
              :items="formated_quiz"
              sort-by="quizname"
              @click:row="handleRowClick"
          >
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <div @click.stop="$router.push(`quiz/edit/${item.name}`)" class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#DEDEDE"/>
                    <circle cx="19.5" cy="19.5" r="19.5" stroke="#DEDEDE"/>
                    <path
                        d="M12.4453 24.0555V27.1111H15.5009L24.5127 18.0992L21.4572 15.0437L12.4453 24.0555ZM26.8757 15.7363C27.1935 15.4185 27.1935 14.9052 26.8757 14.5874L24.969 12.6807C24.6512 12.3629 24.1379 12.3629 23.8201 12.6807L22.329 14.1718L25.3846 17.2274L26.8757 15.7363Z"
                        fill="black"/>
                  </svg>

                  <div class="tooltip-text">
                    Edit
                  </div>
                </div>
                <div @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/delete_quiz',
                      parameters: { id: item._id },
                    },
                    title: 'Delete Quiz',
                    message: 'Are you sure you want to delete this quiz?',
                  })
                " class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#FC6767"/>
                    <path
                        d="M13.8148 26.037C13.8148 26.9333 14.5481 27.6667 15.4444 27.6667H21.963C22.8593 27.6667 23.5926 26.9333 23.5926 26.037V16.2593H13.8148V26.037ZM15.4444 17.8889H21.963V26.037H15.4444V17.8889ZM21.5556 13.8148L20.7407 13H16.6667L15.8519 13.8148H13V15.4444H24.4074V13.8148H21.5556Z"
                        fill="white"/>
                  </svg>

                  <div class="tooltip-text">
                    Delete
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Quiz list is empty</span>
            </template>
          </v-data-table>
          <v-data-table
              v-else-if="currentView === 'exams'"
              :search="search"
              :headers="exam_headers"
              :items="exams"
              sort-by="name"
              @click:row="handleRowClick"
          >
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <div v-if="item.status !== 'RELEASED'" @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/change_exam_status',
                      parameters: { id: item._id, status: item.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT', user_group: item.course.user_group, name: item.title },
                    },
                    title: 'Change Exam Status',
                    message: `Are you sure you want to ${item.status === 'DRAFT' ? 'Publish' : 'Un publish'} this exam?`,
                  })
                " class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#193074"/>
                    <path
                        d="M19.0993 29.812C19.4642 29.812 19.7599 29.5163 19.7599 29.1552V17.1608L22.7403 20.1412C22.8671 20.2679 23.0361 20.3332 23.205 20.3332C23.374 20.3332 23.543 20.2679 23.6698 20.1412C23.9271 19.8838 23.9271 19.4652 23.6698 19.2079L19.5641 15.1022C19.3067 14.8448 18.8881 14.8448 18.6308 15.1022L14.5289 19.2079C14.2716 19.4652 14.2716 19.8838 14.5289 20.1412C14.7863 20.3985 15.2049 20.3985 15.4622 20.1412L18.4426 17.1608V29.1552C18.4426 29.5163 18.7345 29.812 19.0993 29.812Z"
                        fill="white"/>
                    <path
                        d="M27.2 11.6606C27.2 11.2957 26.9043 11 26.5433 11H11.6568C11.2919 11 11 11.2957 11 11.6606C11 12.0255 11.2957 12.3212 11.6568 12.3212H26.5433C26.9081 12.3174 27.2 12.0216 27.2 11.6606Z"
                        fill="white"/>
                  </svg>
                  <div class="tooltip-text">
                    {{ item.status === 'DRAFT' ? 'Publish' : 'Un publish' }}
                  </div>
                </div>
                <div @click.stop="$router.push(`exams/edit/${item._id.toString()}`)" class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#DEDEDE"/>
                    <circle cx="19.5" cy="19.5" r="19.5" stroke="#DEDEDE"/>
                    <path
                        d="M12.4453 24.0555V27.1111H15.5009L24.5127 18.0992L21.4572 15.0437L12.4453 24.0555ZM26.8757 15.7363C27.1935 15.4185 27.1935 14.9052 26.8757 14.5874L24.969 12.6807C24.6512 12.3629 24.1379 12.3629 23.8201 12.6807L22.329 14.1718L25.3846 17.2274L26.8757 15.7363Z"
                        fill="black"/>
                  </svg>

                  <div class="tooltip-text">
                    Edit
                  </div>
                </div>
                <div @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/delete_quiz',
                      parameters: { id: item._id },
                    },
                    title: 'Delete Quiz',
                    message: 'Are you sure you want to delete this quiz?',
                  })
                " class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#FC6767"/>
                    <path
                        d="M13.8148 26.037C13.8148 26.9333 14.5481 27.6667 15.4444 27.6667H21.963C22.8593 27.6667 23.5926 26.9333 23.5926 26.037V16.2593H13.8148V26.037ZM15.4444 17.8889H21.963V26.037H15.4444V17.8889ZM21.5556 13.8148L20.7407 13H16.6667L15.8519 13.8148H13V15.4444H24.4074V13.8148H21.5556Z"
                        fill="white"/>
                  </svg>

                  <div class="tooltip-text">
                    Delete
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:item.course="{ item }">
              <div class="assignment_title">{{ item.course.name }}</div>
            </template>
            <template v-slot:item.marks="{ item }">
              <div>{{ item.total_marks }}</div>
            </template>
            <template v-slot:item.date="{ item }">
              <div class="assignment_td">
                {{ item.starting_time | formatDate }}
              </div>
              <div class="assignment_td">
                {{ getTime(item.starting_time) }}
              </div>
            </template>
            <template v-slot:item.duration="{ item }">
              <div>{{ new Date(item.duration * 1000).toISOString().substr(11, 8) }}</div>
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Exam list is empty</span>
            </template>
          </v-data-table>
          <v-data-table
              v-else
              :search="search"
              :headers="assignments_headers"
              :items="assignments"
              sort-by="title"
              @click:row="handleRowClick"
          >
            <template v-slot:item.target="{ item }">
              <div class="target">
                <div v-if="item.target.course" class="title">{{ item.target.course.name }}</div>
                <div v-if="item.target.chapter" class="subtitle">{{ item.target.chapter.name }}</div>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <div class="assignment_title">
                {{ item.title }}
              </div>
            </template>
            <template v-slot:item.created="{ item }">
              <div class="assignment_td">
                {{ item.createdAt | formatDate }}
              </div>
            </template>
            <template v-slot:item.dueDate="{ item }">
              <div class="assignment_td">
                {{ item.dueDate | formatDate }}
              </div>
              <div class="assignment_td">
                {{ getTime(item.dueDate) }}
              </div>
            </template>
            <template v-slot:item.marks="{ item }">
              <div class="assignment_td">
                {{ item.total_marks }} Marks
              </div>
            </template>
            <template v-slot:item.status="{ item }">
              <div class="assignment_td">
                {{ item.status }}
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="d-flex justify-center">
                <div v-if="item.status !== 'RELEASED'" @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/change_assignment_status',
                      parameters: { id: item._id, status: item.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT', user_group: item.target.course.user_group._id, name: item.title },
                    },
                    title: 'Change Assignment Status',
                    message: `Are you sure you want to ${item.status === 'DRAFT' ? 'Publish' : 'Un publish'} this assignment?`,
                  })
                " class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#193074"/>
                    <path
                        d="M19.0993 29.812C19.4642 29.812 19.7599 29.5163 19.7599 29.1552V17.1608L22.7403 20.1412C22.8671 20.2679 23.0361 20.3332 23.205 20.3332C23.374 20.3332 23.543 20.2679 23.6698 20.1412C23.9271 19.8838 23.9271 19.4652 23.6698 19.2079L19.5641 15.1022C19.3067 14.8448 18.8881 14.8448 18.6308 15.1022L14.5289 19.2079C14.2716 19.4652 14.2716 19.8838 14.5289 20.1412C14.7863 20.3985 15.2049 20.3985 15.4622 20.1412L18.4426 17.1608V29.1552C18.4426 29.5163 18.7345 29.812 19.0993 29.812Z"
                        fill="white"/>
                    <path
                        d="M27.2 11.6606C27.2 11.2957 26.9043 11 26.5433 11H11.6568C11.2919 11 11 11.2957 11 11.6606C11 12.0255 11.2957 12.3212 11.6568 12.3212H26.5433C26.9081 12.3174 27.2 12.0216 27.2 11.6606Z"
                        fill="white"/>
                  </svg>
                  <div class="tooltip-text">
                    {{ item.status === 'DRAFT' ? 'Publish' : 'Un publish' }}
                  </div>
                </div>
                <div @click.stop="$router.push(`/assessments/assignments/edit/${item._id.toString()}`)" class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#DEDEDE"/>
                    <circle cx="19.5" cy="19.5" r="19.5" stroke="#DEDEDE"/>
                    <path
                        d="M12.4453 24.0555V27.1111H15.5009L24.5127 18.0992L21.4572 15.0437L12.4453 24.0555ZM26.8757 15.7363C27.1935 15.4185 27.1935 14.9052 26.8757 14.5874L24.969 12.6807C24.6512 12.3629 24.1379 12.3629 23.8201 12.6807L22.329 14.1718L25.3846 17.2274L26.8757 15.7363Z"
                        fill="black"/>
                  </svg>

                  <div class="tooltip-text">
                    Edit
                  </div>
                </div>
                <div @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/delete_assignment',
                      parameters: { id: item._id },
                    },
                    title: 'Delete Assignment',
                    message: 'Are you sure you want to delete this assignment?',
                  })
                " class="tooltip">
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.5" cy="19.5" r="19.5" fill="#FC6767"/>
                    <path
                        d="M13.8148 26.037C13.8148 26.9333 14.5481 27.6667 15.4444 27.6667H21.963C22.8593 27.6667 23.5926 26.9333 23.5926 26.037V16.2593H13.8148V26.037ZM15.4444 17.8889H21.963V26.037H15.4444V17.8889ZM21.5556 13.8148L20.7407 13H16.6667L15.8519 13.8148H13V15.4444H24.4074V13.8148H21.5556Z"
                        fill="white"/>
                  </svg>

                  <div class="tooltip-text">
                    Delete
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Assignments list is empty</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      Sorry this page is under construction, you can
      <router-link :to="`/reports`">view your reports</router-link>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {getTime} from "../../services/global_functions";

export default {
  data: () => ({
    search: "",
    currentView: 'quiz',
    headers: [
      {
        text: "Quiz name",
        align: "start",
        sortable: false,
        value: "name",
      },
      {text: "Course name", value: "course"},
      {text: "usage", value: "usage"},
      {text: "No of questions", value: "containedQuestions"},
      {text: "Duration", value: "duration"},
      {text: "Date Added", value: "date"},
      {text: "Action", value: "actions", sortable: false, align: "center"},
    ],
    exam_headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      {text: "Course", value: "course"},
      {text: "Date & Time", value: "date"},
      {text: "Duration", value: "duration"},
      {text: "Marks", value: "marks"},
      {text: "Status", value: "status"},
      {text: "Action", value: "actions", sortable: false, align: "center"},
    ],
    assignments_headers: [
      {
        text: "Target",
        align: "start",
        sortable: false,
        value: "target",
      },
      {text: "Title", value: "title"},
      {text: "Created", value: "created"},
      {text: "Due date", value: "dueDate"},
      {text: "Marks", value: "marks"},
      {text: "Status", value: "status"},
      {text: "Action", value: "actions", sortable: false, align: "center"},
    ],
  }),
  computed: {
    // get the current course
    ...mapGetters("quiz", ["all_quiz", "assignments","exams"]),
    // format the quiz to fit in the table
    formated_quiz() {
      let formated_quiz = [];
      for (const quiz of this.all_quiz) {
        formated_quiz.push({
          _id: quiz._id,
          name: quiz.name,
          course: quiz.course ? quiz.course.name : "Not yet Attached",
          usage: quiz.usage,
          containedQuestions: quiz.questions.length,
          duration: new Date(quiz.duration * 1000).toISOString().substr(11, 8),
          date: quiz.createdAt.split("T")[0].split("-").reverse().join("/"),
        });
      }
      return formated_quiz;
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  watch:{
    $route(){
      this.setCurrentView()
    }
  },
  methods: {
    ...mapActions("quiz", ["getQuizes", "getAssignments","getExams"]),
    ...mapActions("modal", ["set_modal"]),
    getTime,
    handleRowClick(value) {
      this.$router.push(this.currentView === 'quiz' ? `quiz/attempt/${value.name}` : this.currentView === 'exams' ? `exams/attempt/${value._id}` : `assignments/${value._id}`)
    },
    setCurrentView() {
      if (this.$route.path.includes('/assessments/quiz'))
        this.currentView = 'quiz'
      else if (this.$route.path.includes('/assessments/exams'))
        this.currentView = 'exams'
      else
        this.currentView = 'assignments'
    }
  },
  created() {
    this.setCurrentView()
    // load formated_quiz
    this.getQuizes({
      user_name: this.$store.state.user.user.user_name,
    });
    this.getAssignments();
    this.getExams();
  },
};
</script>

<style lang="scss">
#view-quiz {
  .tooltip svg {
    margin-right: 17px;
  }

  .tooltip-text {
    visibility: hidden;
    width: fit-content;
    background: #1c1e23;
    text-align: center;
    border-radius: 10px;
    padding: 7px;
    position: absolute;
    z-index: 1;
    bottom: 70%;
    left: 50%;
    margin-left: -5px;
    opacity: 0;
    transition: opacity 0.3s;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10.0903px;
    line-height: 15px;
    color: #FFFFFF;
  }

  .tooltip-text::after {
    border: none;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  .assignment_title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    /* or 698% */

    display: flex;
    align-items: center;

    /* primary color / 50% */

    color: #2D3E70;
  }

  .target {
    .title {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 15px !important;
      /* or 698% */

      display: flex;
      align-items: center;

      /* primary color / 50% */

      color: #2D3E70;
    }

    .subtitle {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      /* or 1256% */

      display: flex;
      align-items: center;

      /* primary color / 50% */

      color: #2D3E70;

    }
  }

  table {
    tbody {
      tr {
        cursor: pointer;
      }
    }
  }

  .v-input {
    max-width: 302px;
  }

  .create {
    width: 154px;
    height: 34px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: #FFFFFF;

    background: #193074;
    /* primary color / 50% */

    border: 1px solid #2D3E70;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .nav {

    .item {
      margin-right: 38px;
      display: flex;

      svg {
        margin-right: 9px;

        path {
          fill: #ABABAB;
        }
      }

      div {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;

        color: #717171;
      }

      &.active {
        div {
          color: #193074 !important;
        }

        svg {
          path {
            fill: #193074;
          }
        }
      }
    }
  }
}

.round {
  .v-card > *:first-child:not(.v-btn):not(.v-chip),
  .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
    border-top-left-radius: 50% !important;
    border-top-right-radius: 50% !important;
  }
}

.v-avatar.svg_container {
  background-color: $primary;

  svg {
    height: initial !important;
    width: initial !important;
  }
}
</style>