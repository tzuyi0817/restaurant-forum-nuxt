<template>
  <footer id="footer">
    <div class="container mt-4">
      <p>YOUTUBE| 客服信箱 | 運費說明 | 常見QA | 隱私權及版權聲明</p>
      <div class="footer-logistics">
        <p>物流合作</p>
        <img
          style="width: 100px;"
          src="https://www.logolynx.com/images/logolynx/39/39a41016f188293d5de7ea4f854ff873.png"
        />
        <img
          style="width: 100px;"
          src="http://pic.pimg.tw/senseofvision/7937b7df062642055f33024a445972ca.jpg"
        />
      </div>

      <div class="footer-social-icon mt-3">
        <p>關注我們</p>
        <nuxt-link to>
          <font-awesome-icon :icon="['fab', 'facebook-f']" class="icon" />
        </nuxt-link>
        <nuxt-link to>
          <font-awesome-icon :icon="['fab', 'twitter']" class="icon" />
        </nuxt-link>
        <nuxt-link to>
          <font-awesome-icon :icon="['fab', 'github-alt']" class="icon" />
        </nuxt-link>
        <nuxt-link to>
          <font-awesome-icon :icon="['fab', 'skype']" class="icon" />
        </nuxt-link>
        <nuxt-link to>
          <font-awesome-icon :icon="['fab', 'linkedin-in']" class="icon" />
        </nuxt-link>
      </div>

      <div class="footer-content mt-3">
        <p>&copy; 2019 MuseClub | All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@mixin respond-between($lower, $upper, $font-size) {
  @media screen and (min-width: $lower) and (max-width: $upper) {
    font-size: $font-size;
  }
}

@mixin respond-and($upper, $font-size) {
  @media screen and (max-width: $upper) {
    font-size: $font-size;
  }
}

p {
  color: #0085a5;
  @include respond-between(960px, 1100px, 15px);
  @include respond-between(768px, 960px, 10px);
  @include respond-and(768px, 15px);
}

footer {
  padding: 20px 0;
  text-align: center;
  background-color: #d2f0f5;
  color: #0085a5;
}

.footer-content {
  p {
    line-height: 22px;
  }
}

.icon {
  color: #0085a5;
  display: inline-block;
  font-size: 20px;
  line-height: 20px;
  margin-right: 15px;
}
</style>