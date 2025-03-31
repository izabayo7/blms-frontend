<template>
  <div :class="`sidebar ${onPhone ? (state ? 'absolute' : 'd-none') : ''} ${state?'open':''} mt-n4 pt-6`">
    <div class="routes">
      <ul ref="nav">
        <div class="active-link"></div>
        <li
            v-if="userCategory === 'ADMIN' || userCategory === 'INSTRUCTOR'"
            @click="
            closeSidebar();
            routeTo('/welcome');
          "
            :class="{ active: activeRoute('welcome') }"
        >
          <div class="link-icon">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <path
                    d="M16.5412 7.39418C16.5408 7.39379 16.5404 7.3934 16.54 7.39301L9.60535 0.458618C9.30976 0.162903 8.91677 0 8.49875 0C8.08073 0 7.68774 0.162773 7.39202 0.458488L0.461001 7.38938C0.458666 7.39172 0.456331 7.39418 0.453997 7.39651C-0.152998 8.00701 -0.15196 8.99753 0.45698 9.60647C0.735186 9.8848 1.10263 10.046 1.49549 10.0629C1.51144 10.0644 1.52752 10.0652 1.54373 10.0652H1.82012V15.1685C1.82012 16.1784 2.64177 17 3.65187 17H6.36493C6.63989 17 6.86298 16.777 6.86298 16.502V12.501C6.86298 12.0402 7.23781 11.6653 7.69863 11.6653H9.29887C9.75969 11.6653 10.1345 12.0402 10.1345 12.501V16.502C10.1345 16.777 10.3575 17 10.6326 17H13.3456C14.3557 17 15.1774 16.1784 15.1774 15.1685V10.0652H15.4337C15.8516 10.0652 16.2445 9.90244 16.5404 9.60673C17.15 8.99675 17.1502 8.00455 16.5412 7.39418Z"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="17" height="17" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          </div>
          <div
              class="link-name"
              v-show="state"
          >
            Home
          </div>
        </li>
        <li
            v-if="userCategory === 'ADMIN' || userCategory === 'INSTRUCTOR'"
            @click="
            closeSidebar();
            routeTo(userCategory === 'ADMIN' ? '/users' : '/students');
          "
            :class="{ active: activeRoute('users') }"
        >
          <div class="link-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
            >
              <g clip-path="url(#clip0)">
                <path
                    d="M18.7788 12.1808H17.0815C17.2545 12.6545 17.3491 13.1657 17.3491 13.6984V20.113C17.3491 20.3351 17.3104 20.5484 17.2401 20.7466H20.046C21.0941 20.7466 21.9468 19.8939 21.9468 18.8458V15.3489C21.9469 13.6021 20.5257 12.1808 18.7788 12.1808Z"
                    fill="white"
                />
                <path
                    d="M4.59782 13.6985C4.59782 13.1657 4.69234 12.6546 4.86534 12.1809H3.16809C1.4212 12.1809 0 13.6021 0 15.349V18.8459C0 19.894 0.852696 20.7467 1.90085 20.7467H4.70682C4.63648 20.5484 4.59782 20.3352 4.59782 20.1131V13.6985Z"
                    fill="white"
                />
                <path
                    d="M12.9135 10.5304H9.03332C7.28644 10.5304 5.86523 11.9516 5.86523 13.6985V20.1131C5.86523 20.463 6.14891 20.7467 6.49885 20.7467H15.4479C15.7979 20.7467 16.0816 20.463 16.0816 20.1131V13.6985C16.0816 11.9516 14.6604 10.5304 12.9135 10.5304Z"
                    fill="white"
                />
                <path
                    d="M10.9731 2.13007C8.87225 2.13007 7.16309 3.83923 7.16309 5.94013C7.16309 7.36515 7.9496 8.60971 9.11113 9.26313C9.66207 9.57304 10.2972 9.75015 10.9731 9.75015C11.649 9.75015 12.2841 9.57304 12.8351 9.26313C13.9967 8.60971 14.7831 7.36511 14.7831 5.94013C14.7831 3.83927 13.074 2.13007 10.9731 2.13007Z"
                    fill="white"
                />
                <path
                    d="M4.28299 5.68134C2.7118 5.68134 1.43359 6.95954 1.43359 8.53073C1.43359 10.1019 2.7118 11.3801 4.28299 11.3801C4.68154 11.3801 5.06106 11.2976 5.40581 11.1492C6.00188 10.8925 6.49336 10.4383 6.79748 9.86925C7.01095 9.46988 7.13238 9.01428 7.13238 8.53073C7.13238 6.95959 5.85417 5.68134 4.28299 5.68134Z"
                    fill="white"
                />
                <path
                    d="M17.6638 5.68134C16.0927 5.68134 14.8145 6.95954 14.8145 8.53073C14.8145 9.01432 14.9359 9.46992 15.1494 9.86925C15.4535 10.4383 15.945 10.8926 16.541 11.1492C16.8858 11.2976 17.2653 11.3801 17.6638 11.3801C19.235 11.3801 20.5132 10.1019 20.5132 8.53073C20.5132 6.95954 19.235 5.68134 17.6638 5.68134Z"
                    fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                      width="21.9464"
                      height="21.9464"
                      fill="white"
                      transform="translate(0 0.46521)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
              class="link-name"
              v-show="state"
          >
            {{ userCategory === 'ADMIN' ? 'Users' : 'Students' }}
          </div>
        </li>
        <li
            v-if="userCategory === 'ADMIN'"
            @click="$router.push('/faculties')"
            :class="{ active: activeRoute('faculties') }"
        >
          <div class="link-icon">
            <svg
                class="unique"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
            >
              <path
                  d="M10.9737 25.0983C10.9389 25.0983 10.9041 25.0952 10.8698 25.0892C4.46983 23.9667 0 20.1148 0 15.7221V1.2096C0 0.883251 0.266889 0.618652 0.596067 0.618652H21.3512C21.6804 0.618652 21.9472 0.883251 21.9472 1.2096V15.7221C21.9472 20.1148 17.4774 23.9667 11.0774 25.0892C11.0431 25.0952 11.0084 25.0983 10.9737 25.0983Z"
                  fill="white"
              />
              <path
                  d="M11.3954 7.79366L5.06445 5.68335V14.9687L11.3954 17.079M11.3954 7.79366L17.7263 5.68335V14.5467L11.3954 17.079M11.3954 7.79366V17.079M13.5057 9.90397L16.0381 9.05985M13.5057 12.4363L16.0381 11.5922M9.28508 12.4363L6.7527 11.5922M9.28508 9.90397L6.7527 9.05985"
                  stroke-width="1.2"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </div>
          <div
              class="link-name"
              v-show="state"
          >
            Faculties
          </div>
        </li>
        <li
            v-if="userCategory === 'STUDENT' || userCategory === 'INSTRUCTOR'"
            @click="
            closeSidebar();
            routeTo('/courses');
          "
            :class="{ active: activeRoute('courses') }"
        >
          <div class="link-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="101.875"
                height="87.321"
                viewBox="0 0 101.875 87.321"
            >
              <path
                  id="Icon_ionic-md-school"
                  data-name="Icon ionic-md-school"
                  d="M20.783,53.891v19.4l32.4,18.533,32.4-18.533v-19.4l-32.4,18.533ZM53.187,4.5,2.25,33.607,53.187,62.714,94.869,38.905V72.424h9.255V33.607Z"
                  transform="translate(-2.25 -4.5)"
              />
            </svg>
          </div>
          <div class="link-name" v-show="state">Courses</div>
        </li>
        <li
            v-if="userCategory === 'ADMIN' || userCategory === 'INSTRUCTOR'"
            @click="
            closeSidebar();
            routeTo('/announcements');
          "
            :class="{ active: activeRoute('announcements') }"
        >
          <div class="link-icon">
            <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M22.2706 8.24548C21.964 7.98083 21.9301 7.51798 22.1947 7.21142L24.337 4.72984C24.602 4.42396 25.0646 4.38933 25.3711 4.65398C25.6777 4.91863 25.7116 5.38148 25.447 5.68804L23.3046 8.16962C23.0368 8.47817 22.5752 8.5079 22.2706 8.24548Z"
                  fill="#2D3E70"/>
              <path
                  d="M28.2337 14.0605L24.963 13.8356C24.559 13.8078 24.2541 13.4579 24.2819 13.0538C24.3113 12.6499 24.6604 12.3469 25.0636 12.3727L28.3343 12.5976C28.7383 12.6254 29.0432 12.9753 29.0154 13.3794C28.9874 13.7809 28.641 14.0874 28.2337 14.0605Z"
                  fill="#2D3E70"/>
              <path
                  d="M26.8692 9.94334L24.1627 11.0717C23.7887 11.2276 23.3599 11.0511 23.204 10.6771C23.048 10.3031 23.2245 9.87432 23.5985 9.71841L26.305 8.59008C26.679 8.43417 27.1078 8.61064 27.2637 8.98463C27.4196 9.35862 27.2432 9.78742 26.8692 9.94334Z"
                  fill="#2D3E70"/>
              <path
                  d="M17.7926 3.40569C17.4186 3.56161 17.2421 3.9904 17.3981 4.3644L17.8008 5.33053C16.0075 7.91635 13.5483 10.13 10.8114 11.6802L13.7711 18.7795C16.7986 17.9266 20.102 17.7378 23.2011 18.2841L23.6038 19.2502C23.7598 19.6242 24.1885 19.8006 24.5625 19.6447C24.9365 19.4888 25.113 19.06 24.9571 18.686L18.7513 3.80023C18.5954 3.42624 18.1666 3.24977 17.7926 3.40569Z"
                  fill="#2D3E70"/>
              <path
                  d="M14.1598 24.1212C13.0692 23.2595 11.9819 22.1666 11.9132 20.8346L8.41662 21.8556C8.15376 21.9325 7.88926 21.9792 7.62544 22.009C7.72856 23.6569 8.36443 25.0553 8.84948 26.0977C8.97331 26.3649 9.08964 26.6142 9.18634 26.8461C9.34226 27.2201 9.77105 27.3966 10.145 27.2407L14.2048 25.5482C14.4394 25.4504 14.6067 25.2379 14.6465 24.9871C14.6868 24.7361 14.5942 24.4823 14.4018 24.3166L14.1598 24.1212Z"
                  fill="#2D3E70"/>
              <path
                  d="M4.17011 18.6152C4.79654 20.1178 6.44697 20.9065 8.00943 20.4498L12.3487 19.1821L9.52407 12.4067L5.56932 14.5967C4.14516 15.3851 3.54369 17.1126 4.17011 18.6152Z"
                  fill="#2D3E70"/>
            </svg>

          </div>
          <div class="link-name" v-show="state">Announcements</div>
        </li>
        <li
            v-if="userCategory === 'STUDENT' || userCategory === 'INSTRUCTOR'"
            @click="
            closeSidebar();
            routeTo('/reports');
          "
            :class="{ active: activeRoute('reports') }"
        >
          <div class="link-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="122.268"
                viewBox="0 0 100 122.268"
            >
              <path
                  id="Path_20"
                  data-name="Path 20"
                  d="M229.942,77.458a1.177,1.177,0,0,0-.2-.811h0c-.013-.013-.026-.039-.039-.052h0c-.013-.013-.026-.039-.039-.052s-.026-.039-.039-.052l-.039-.039a.013.013,0,0,0-.013-.013L225.742,72.6q-4.436-4.456-8.886-8.886-5.006-5.006-9.985-10l-7.145-7.145c-.419-.419-.824-.864-1.269-1.269a2.165,2.165,0,0,0-1.688-.393h-56.73c-2.2,0-4.41-.2-6.412.916a7.322,7.322,0,0,0-3.664,6.321V159.3c0,.222-.013.432,0,.654a7.254,7.254,0,0,0,6.295,7.119,28.7,28.7,0,0,0,3.677.065H220.3a14.923,14.923,0,0,0,4.646-.34,7.317,7.317,0,0,0,5.012-6.87V77.458Zm-19.734,66.781H149.7a2.617,2.617,0,1,1,0-5.235h4.083V114.558a5.092,5.092,0,0,1,.249-2.264c.811-1.61,2.814-1.3,4.305-1.3h5.536c.563,0,1.139.013,1.7.026a1.126,1.126,0,0,1,.209.013c.039,0,.079.013.118.013s.079.013.118.013.052.013.079.013a1.089,1.089,0,0,1,.2.052h.013a2.361,2.361,0,0,1,.275.1h0a2.324,2.324,0,0,1,1.309,1.6,1.838,1.838,0,0,1,.118.406c0,.026.013.039.013.052v.013a.491.491,0,0,0,.013.131c0,.013-.013.026-.013.039V138.99h5.365v-.144c0-.222.026-.458.026-.681s.013-.471.013-.707c.013-.707.039-1.413.052-2.107,0-.2.013-.406.013-.6,0-.17,0-.327.013-.5V98.906c0-.327-.026-.641-.026-.968a3.439,3.439,0,0,1,.026-.366c.013-.079.026-.144.039-.209l.079-.275c.013-.026.026-.065.039-.092l.039-.079.118-.236c.013-.013.013-.039.026-.052a.794.794,0,0,1,.092-.131,2.274,2.274,0,0,1,1.583-.929c.065-.013.144-.013.222-.026.236-.013.484-.026.72-.026h.17c1.322-.026,2.643.013,3.965.039h4.2c.2,0,.38-.026.576-.013a2.332,2.332,0,0,1,.694.131c.013,0,.039.013.052.013a1.857,1.857,0,0,1,.458.222,1.372,1.372,0,0,1,.144.1h0c.052.039.092.079.144.118l.065.065.065.065a2.407,2.407,0,0,1,.222.288c.013.026.039.052.052.079a1.491,1.491,0,0,1,.131.249.638.638,0,0,1,.039.092,1.711,1.711,0,0,1,.118.366c.013.039.026.092.039.131s.013.065.026.092a1.45,1.45,0,0,1,.026.249V139H193.2c0-1.675.079-3.35.079-5.025V104.861a3.453,3.453,0,0,1,.065-.968,2.448,2.448,0,0,1,2.67-1.662h8.807a2.673,2.673,0,0,1,1.937.707c.065.065.131.144.2.222a1.952,1.952,0,0,1,.236.393h0a4.727,4.727,0,0,1,.17.458,1.32,1.32,0,0,1,.065.327V139h2.774a2.668,2.668,0,0,1,2.617,2.617A2.639,2.639,0,0,1,210.208,144.238Zm-6.5-68.181h-1.727c-.1,0-.222-.013-.327-.013-.157-.039-.314-.065-.471-.1-.131-.039-.707-.157-.34-.1.039,0,.079.013.1.013a1.027,1.027,0,0,1-.183-.065c-.131-.065-.249-.131-.38-.209l-.2-.131c-.026-.039-.353-.3-.419-.353-.026-.026-.144-.131-.249-.236a.273.273,0,0,0-.052-.079l-.039-.079c-.052-.065-.092-.144-.144-.209-.026-.039-.131-.209-.209-.353h0a.607.607,0,0,1-.039-.118,1.026,1.026,0,0,0-.065-.183c-.013-.026-.013-.039-.026-.065-.052-.157,0-.314-.131-.471h0v-.17h0a1.1,1.1,0,0,1-.026-.131.59.59,0,0,0,.026.1c0-.092-.013-.17-.013-.222,0-.222,0-.432.013-.654V59.176c0-1.767.026-3.533.039-5.3l6.072,6.072,16.11,16.11Z"
                  transform="translate(-129.956 -44.898)"
              />
            </svg>
          </div>
          <div class="link-name" v-show="state">Reports</div>
        </li>
        <!--        <li-->
        <!--          v-if="userCategory === 'STUDENT' || userCategory === 'INSTRUCTOR'"-->
        <!--          @click="-->
        <!--            closeSidebar();-->
        <!--            $router.push('/library');-->
        <!--          "-->
        <!--          :class="{ active: activeRoute('library') }"-->
        <!--        >-->
        <!--          <div class="link-icon">-->
        <!--            <svg-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--              width="174.421"-->
        <!--              height="121.839"-->
        <!--              viewBox="0 0 174.421 121.839"-->
        <!--            >-->
        <!--              <path-->
        <!--                id="Icon_metro-books"-->
        <!--                data-name="Icon metro-books"-->
        <!--                d="M38.108,8.571H7.648a5.092,5.092,0,0,0-5.077,5.077V125.334a5.092,5.092,0,0,0,5.077,5.077h30.46a5.092,5.092,0,0,0,5.077-5.077V13.648a5.092,5.092,0,0,0-5.077-5.077Zm-5.077,30.46H12.725V28.878H33.031V39.031ZM88.874,8.571H58.414a5.092,5.092,0,0,0-5.077,5.077V125.334a5.092,5.092,0,0,0,5.077,5.077h30.46a5.092,5.092,0,0,0,5.077-5.077V13.648a5.092,5.092,0,0,0-5.077-5.077ZM83.8,39.031H63.491V28.878H83.8Zm40.151-22.61-27.2,13.706A5.092,5.092,0,0,0,94.5,36.945l45.686,90.673c1.256,2.494,4.324,3.506,34.02-11.456a5.092,5.092,0,0,0,2.249-6.818L130.766,18.671a5.092,5.092,0,0,0-6.818-2.25Z"-->
        <!--                transform="translate(-2.571 -8.571)"-->
        <!--              />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="link-name" v-show="state">Library</div>-->
        <!--        </li>-->
        <li
            @click="
            closeSidebar();
            routeTo('/messages');
          "
            :class="{ active: activeRoute('messages') }"
        >
          <div class="link-icon">
            <div v-if="!activeRoute('messages') && unreads" class="number">{{ unreads }}</div>
            <svg
                width="26"
                height="27"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                    d="M17.5105 2.67578H2.86376C1.28449 2.67578 0 3.96027 0 5.53954V18.3745C0 18.9824 0.687451 19.3251 1.17271 18.9784L5.25171 16.0682C5.59398 15.8243 5.99658 15.6952 6.417 15.6952H15.3886C16.9679 15.6952 18.2524 14.4108 18.2524 12.8315V3.41769C18.2524 3.00816 17.92 2.67578 17.5105 2.67578ZM13.9068 11.6632H5.3348C4.92527 11.6632 4.5929 11.3314 4.5929 10.9213C4.5929 10.5118 4.92527 10.1794 5.3348 10.1794H13.9068C14.3163 10.1794 14.6487 10.5118 14.6487 10.9213C14.6487 11.3314 14.3163 11.6632 13.9068 11.6632ZM13.9068 8.20101H5.3348C4.92527 8.20101 4.5929 7.86913 4.5929 7.4591C4.5929 7.04957 4.92527 6.71719 5.3348 6.71719H13.9068C14.3163 6.71719 14.6487 7.04957 14.6487 7.4591C14.6487 7.86913 14.3163 8.20101 13.9068 8.20101Z"
                    fill="#BABABC"
                />
                <path
                    d="M25.3227 11.2939V24.1284C25.3227 24.7322 24.6387 25.0814 24.15 24.7323L20.071 21.8226C19.7287 21.5787 19.3261 21.4497 18.9057 21.4497H9.93407C8.3548 21.4497 7.07031 20.1647 7.07031 18.5854V17.1787H15.3876C17.7849 17.1787 19.7352 15.2285 19.7352 12.8312V8.42969H22.4589C24.0382 8.42969 25.3227 9.71467 25.3227 11.2939Z"
                    fill="#BABABC"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                      width="25.324"
                      height="26.1957"
                      fill="white"
                      transform="translate(0 0.675781)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="link-name" v-show="state">Messages</div>
        </li>
        <li
            v-if="userCategory === 'INSTRUCTOR'"
            @click="
            closeSidebar();
            routeTo('/quiz');
          "
            :class="{ active: activeRoute('quiz') }"
        >
          <div class="link-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
            >
              <path
                  id="Icon_metro-question"
                  data-name="Icon metro-question"
                  d="M17.883,25.991h4.375v4.375H17.883Zm8.75-15.313a2.188,2.188,0,0,1,2.188,2.188v6.563L22.258,23.8H17.883V21.616l6.562-4.375V15.053H13.508V10.678H26.633ZM20.071,5.209A14.219,14.219,0,1,0,30.125,9.374,14.126,14.126,0,0,0,20.071,5.209Zm0-3.281a17.5,17.5,0,1,1-17.5,17.5,17.5,17.5,0,0,1,17.5-17.5Z"
                  transform="translate(-2.071 -1.428)"
              />
            </svg>
          </div>
          <div class="link-name" v-show="state">Quiz</div>
        </li>
      </ul>
    </div>
  </div>
</template>{
<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "Sidebar",
  watch: {
    $route() {
      this.socket.emit("messages/unread");
    }
  },
  computed: {
    ...mapState("sidebar_navbar", {state: "sidebar_expanded", unreads: "total_unread_messages"}),
    ...mapGetters("chat", ["socket"]),
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    onPhone() {
      return (
          this.$vuetify.breakpoint.name == "sm" ||
          this.$vuetify.breakpoint.name == "xs"
      );
    },
  },
  methods: {
    routeTo(path) {
      if (this.$route.path != path)
        this.$router.push(path)
    },
    ...mapMutations("sidebar_navbar", {toggle: "TOGGLE_SIDEBAR_EXPANSION"}),
    activeRoute(route) {
      const routeParts = this.$route.path.split("/");

      return route === routeParts[1];
    },
    closeSidebar() {
      if (this.onPhone) {
        this.toggle();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  box-shadow: 0 11px 15px 0 $secondary;

  transition: .5s;

  width: 101px !important;

  &.open {
    width: 282px !important;
  }

  &.absolute {
    position: absolute;
  }

  .toggle-container {
    border-bottom: 1px solid lighten($font, 65);

    .toggle {
      display: inline-flex;
      align-self: flex-start;
      padding: 1.2rem;
      margin: auto;
      width: fit-content;
      cursor: pointer;
    }
  }

  .number {
    position: absolute;
    width: 23.23px;
    height: 23.23px;
    margin-top: -17px;
    text-align: center;
    background: #193074;
    border-radius: 50px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 9.04395px;
    line-height: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-left: 19px;
  }

  .routes {
    ul {
      list-style-type: none;
      padding: 0px 1.3rem;
      position: relative;

      .active-link {
        display: none;
        width: 3.5rem;
        height: 3.5rem;
        margin: 0 auto;
        background: $primary;
        position: absolute;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 lighten($color: $primary, $amount: 20);
      }

      li {
        padding: 0.8rem;
        // margin: 1.5rem 0.2rem;
        margin: 0.6rem 0.2rem;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-content: center;

        .link-icon {
          svg {
            width: 27px;
            height: 27px;
            fill: #828282;

            path {
              fill: #828282;
              // stroke: #fff;
            }
          }
        }

        .link-name {
          transition: display 0.4s ease-out;
          padding: 0 2rem;
        }

        &.active {
          background: $primary;
          border-radius: 10px;
          background: #193074;
          box-shadow: 2.57812px 3.4375px 5.15625px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 10px 13px;

          svg {
            fill: $main;

            path {
              fill: $main;
            }

            &.unique {
              path {
                stroke: #828282;
              }
            }
          }

          .link-name {
            color: $main;
          }

          // .number {
          //   background: white;
          //   color: #193074;
          // }
        }
      }
    }
  }
}
</style>
