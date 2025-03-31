<template>
  <div
    class="course col-12 col-md-4 d-flex"
    :style="
      course.coverPicture
        ? `background: linear-gradient(180deg, rgba(1, 1, 1, 0) 48.55%, rgba(43, 43, 43, 0.74) 100%), url(${course.coverPicture});`
        : ''
    "
  >
    <div class="details">
      <div class="name">{{ course.name }}</div>
      <div class="language">{{ course.language }}</div>
    </div>
    <div v-if="course.haveCertificate" class="text-center ml-auto">
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect width="46" height="46" fill="url(#pattern1)" />
        <defs>
          <pattern
            id="pattern1"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_4436_416" transform="scale(0.0104167)" />
          </pattern>
          <image
            id="image0_4436_416"
            width="96"
            height="96"
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAGTUlEQVR4nO2d26sVVRzHvyvKG0e09KRWhlreL0VesutLkEFBGPRSvUhQEETUiz7lKYl88j0oe+kv6CkEMzTzhnTSTLx1jGOl2M2SEo0+PawZ2m33nr1n9m/WzOwzH9gvnr1/l+9v1m8ua81SqqmpqampqampqampqQDAJGAb8GP02QZMKjquMQEwBdjL9XwOTCk6vr4GmArsbyF+zGFgWtFx9iXAIDCcIH7Ml8Bg0fH2FcAM4EgX4sccB24rOu5ucEU4BaZLelrSFEkjkk5LOuOc+7PFd2dL2ilpfko3JyU95pw718LmJEl3S7pL0lxJv0n62Dn3U0ofPRO8AMBaSTskTW7x5+/lixF/RiVtkRcpC99KelPSbHnB48/tLb77u6R1zrn9GX1loogCDEu6J7TfLjnqnFsR0mHQAgBz5FtOmZnrnDsbytkNoRxFlPXIb2R5SGehCxA0uYzUBSiYZSGd1QW4nqAxBjsJA+MlXZZ0YyifGbkmacA5dzWEs5AjYLHKL74k3SRpYShnIQtQhfYTEyzWIAWIrv83hPBlxItRzNUGmA5sBf5K8SCtLFwF3gNmFq1jaoABYCNwqVAJbbiMP4imFq1rR4BxwEvA+UIly4ef8QfVREvNzC5DgUclfST/5LGfGZX0gnNut4UxkwIAcyUdlzTewl4FuCJpkXPuu14NWV0FPaexI74kTZDPuWesCjDByE6VMDngrArwiZGdKrHDwohJAZxzeyXtsbBVEfY5576wMGR5J/yOoa2yM2RlyPRpKLBX0oOWNkvIAefcWitj1s+C3jW2V0a2WBoznw8ADklaZW23JAxLus85h5XBPJ6G9vMoeNtSfCmfEeDkj5Sg62sC8I2k5c65fyyNhp4TrmkijwKsV/8d/ZK0RH49qyn1STgd5T4JA0+pf8WXpHslPWlpsL4RS89hSautRoHZCADWqf/Fl6SVkh63MmY5I7Zb0iNW9krOPuecycFmMgKAhzR2xJekB4CHLQxZtaAnjOxUCZM2ZFWAK0Z2qoRJzlaT8nPkJ+XHytTkFUmLLd6ksZoROys/JEct7JWcc/Iv85m8xmR2Geqc2yP/BuLLki5Y2S0Rv0jaJGmB1Zqg3KBemlgO6I/FubOK1rFngDnAzmL1TMUu/Gq/3AkyHxCdsLaH8GXEdudckPeZQ07IHA3oq1eCxRryJb1xkv6QNC6Uz4z8LWmycy7IzWWwERC9dXgqlL8eOBVKfMl+QmYzsCbhK0cs/eVE2/YDrAE2WzqznA8Ykl+ytzLha8es/OVIUv9fJWkI2GrlzOpx9JCk+MhIetW/CifipBjj3DZaFqEngKGma+i2t+n4+4GyMy8h/t1N3zVbpJsJrhcf4Ff84qx2v+lm472iSByh+NyaKWYk0Fr8mAUJv7uf9s+IzgGfAe8Dm4DngTPZ9WQksrEpsrkLGG3z3Uv47dTaxb0wwU/YkUCy+ACvdPj9NGAD8AawHlhBm51vgTuAE10K3sgp4M42NicCyyPfr0exJO43CrzawV+YInQhPvg2Yznhn2XbylYb82X17/D7kXYi33bUpfgxzxj7HuxShK+AW419P5si73xGQkrxAS4AM4xjuBk4mODzEHCLsc9ZwMWUudsWIYP4McP4TVotYxkAPm3h62AO4g+SrvU1YtOOyC5+zAlgtUkw/8UUb1//Q/Qx374e/9jhZI+59zYS6F38mKvAB8DSDv7iq5O02xR3k8v8yHbiZhvAMuBD4JpR7olFSLphany8YMmIpAOSzsvvzzYovzVx45bCl+XfRjFZeYBfNnNU0kD0T/EWySOSLspvUzZT0lpJeWzU9JZzrvvRgN2RnxXzwpcgp+7OCSUINI9RV5bcOhcBmAe8hv8vQUKTm/gFF+FY5HdJ2mBDFiN38RvyClGEbKInBJ1nMYKJ35BPHkWwFT0heMtiBBe/IQ+LIoQRPSGJY1UUvyH+XorwddHx95JA4eLHVDoHYFElA28iYxGKaTvNkK4NlU78mJRFKL79xKQIvLTix1QyF7prQ+UJuANdFqEc7SeG5DZUGfFjOhShPO0nJiHgyokfg3/Lpxo50boNlS/QlLQpQrnaTwz/b0OVFz+mqQjlaz8xDW2ob8SPaShCeXMDllL0eskciQ6wxGnVmpqampqabvkXWJKOHTHWEhQAAAAASUVORK5CYII="
          />
        </defs>
      </svg>

      <div class="certified-text">CERTIFICATE</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SchoolProfileCourse",
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.course {
  width: 100%;
  max-width: 331.79px;
  height: 236px;
  margin-right: 31px;
  margin-bottom: 31px;
  align-items: end;
  padding: 0px 29px 15px 12px;
  border-radius: 5.41262px;
  cursor: pointer;
  .details {
    .name {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 700;
      font-size: 15.6966px;
      line-height: 19px;

      color: #ffffff;
      margin-bottom: 5px;
    }
    .language {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 10.8252px;
      line-height: 13px;

      color: #ffffff;
    }
  }
  .certified-text {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 8px;
    line-height: 10px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
}
</style>

