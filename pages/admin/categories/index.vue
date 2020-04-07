<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input v-model="newCategoryName" type="etxt" class="form-control" placeholder="新增餐廳類別..." />
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="createCategory"
          >新增</button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">{{ category.name }}</div>

            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span v-show="category.isEditing" class="cancel" @click="handleCancel(category.id)">✕</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >Edit</button>

            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
            >Save</button>

            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
              :disabled="isProcessing"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../../../components/AdminNav";
import adminAPI from "../../../api/admin";
import { Toast } from "../../../plugins/sweetalert2";

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      categories: [],
      newCategoryName: "",
      isProcessing: false
    };
  },
  async asyncData() {
    try {
      const { data, statusText } = await adminAPI.categories.get();

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      return {
        categories: data.categories.map(category => ({
          ...category,
          isEditing: false,
          nameCached: ""
        }))
      };
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "無法取得類別資料，請稍後再試"
      });
    }
  },
  methods: {
    async createCategory() {
      try {
        this.isProcessing = true;

        const { data, statusText } = await adminAPI.categories.create({
          name: this.newCategoryName
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
          isEditing: false
        });

        this.isProcessing = false;
        this.newCategoryName = "";

        Toast.fire({
          icon: "success",
          title: "已成功新增類別"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法新增類別，請稍後再試"
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        this.isProcessing = true;

        const { data, statusText } = await adminAPI.categories.delete({
          categoryId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.categories = this.categories.filter(
          category => categoryId !== category.id
        );

        this.isProcessing = false;

        Toast.fire({
          icon: "success",
          title: "已成功刪除該類別"
        });
      } catch (error) {
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法刪除類別，請稍後再試"
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          };
        }
        return category;
      });
    },
    async updateCategory({ categoryId, name }) {
      try {
        const { data, statusText } = await adminAPI.categories.update({
          categoryId,
          name
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.toggleIsEditing(categoryId);

        Toast.fire({
          icon: "success",
          title: "已成功更新餐廳類別"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳類別，請稍後再試"
        });
      }
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached
          };
        }
        return category;
      });
      this.toggleIsEditing(categoryId);
    }
  }
};
</script>

<style lang="scss" scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>