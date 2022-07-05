<!-- @format -->

<template>
  <div class="container-fluid">
    <!-- start page title -->

    <div class="row mt-4">
      <div class="col-md-3">
        <div class="card card-body">
          <h4 class="card-title">My Account</h4>
          <p style="border-bottom: 1px solid #eee;"></p>
          <ul class="account-settings">
            <li class="profile active" @click="changeAccount('profile')">
              <i class="remixicon-user-line"></i> Profile
            </li>
            <li class="username" @click="changeAccount('username')">
              <i class="remixicon-account-circle-line"></i> Change Username
            </li>
            <li class="password" @click="changeAccount('password')">
              <i class="remixicon-lock-2-line"></i> Change Password
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9 ">
        <change-profile :userId="userId" v-if="profile" />
        <change-username :userId="userId" v-if="username" />
        <change-password :userId="userId" v-if="password" />
      </div>
    </div>
  </div>
</template>
<script>
import ChangeProfile from './account/ChangeProfileComponent'
import ChangeUsername from './account/ChangeUsernameComponent'
import ChangePassword from './account/ChangePasswordComponent'
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  components: {
    ChangeProfile,
    ChangeUsername,
    ChangePassword
  },
  data() {
    return {
      profile: true,
      username: false,
      password: false
    }
  },
  methods: {
    changeAccount(account) {
      $('li').removeClass('active')
      $('li.' + account).addClass('active')

      if (account == 'profile') {
        this.profile = true
        this.username = false
        this.password = false
      } else if (account == 'username') {
        this.profile = false
        this.username = true
        this.password = false
      } else {
        this.profile = false
        this.username = false
        this.password = true
      }
    }
  }
}
</script>
<style>
.account-settings {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.account-settings > li {
  color: #444;
  font-weight: 600;
  display: block;
  padding: 8px 0;
  line-height: 20px;
  cursor: pointer;
}

.account-settings > li + li {
  border-top: 1px solid #eee;
}

.account-settings .active {
  color: #3bafda;
  text-decoration: none;
  background-color: transparent;
}
.modf {
  float: right;
  margin-top: -8px;
}

.form-settings > label,
.modf > label {
  color: #444;
  font-weight: 600;
}

.field-icon {
  float: right;
  margin-left: -40px;
  margin-top: -25px;
  padding-right: 25px;
  position: relative;
  z-index: 2;
}
</style>
