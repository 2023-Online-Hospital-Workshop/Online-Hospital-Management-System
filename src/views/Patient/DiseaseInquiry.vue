<template style="font-family: AliRegular;">
  <div id="main-page">
    <img src="@/assets/bg4.png" class="bgImage" alt="" />
    <h1 class="va-h3">常见病信息查询</h1>
    <div>
    
      <va-card class="card">
      <div class="flex flex-row">
        
        <va-card class="search-card">
          <div class="search-container">
            <va-input v-model="searchKeyword" placeholder="输入关键词进行搜索" style="min-width:400px"></va-input>
            <va-button color="primary" @click="fetchDiseaseData(searchKeyword)">搜索</va-button>
          </div>
        </va-card>
        <div class="button-group">
            <va-button-group preset="secondary" border-color="primary">
              <div class="text" style="margin-top: 10px;">快捷搜索：</div>

            <va-button @click="fetchDiseaseData('头')">头部</va-button>
            <va-button @click="fetchDiseaseData('口腔')">口腔</va-button>
            <va-button @click="fetchDiseaseData('胃')">胃部</va-button>
            <va-button @click="fetchDiseaseData('手')">手部</va-button>
            <va-button @click="fetchDiseaseData('足')">足部</va-button>
            <va-button @click="fetchDiseaseData('眼')">眼部</va-button>
            <va-button @click="fetchDiseaseData('心')">心脏</va-button>
            <va-button @click="fetchDiseaseData('骨')">骨骼</va-button>
            <va-button @click="fetchDiseaseData('肺')">肺部</va-button>
            <va-button @click="fetchDiseaseData('尿')">泌尿</va-button>
            </va-button-group>
        </div>
      </div>
    </va-card>
    

    </div>
    <div style="display: flex;">
    <div class="flex flex-wrap gap-5" style="flex: 1; width: 75%;">
      <va-accordion v-model="value" class="max-w-sm" popout>
        <va-collapse  text-color="textPrimary"
      color="textInverted" v-for="(DiseaseItem, index) in DiseaseData.showapi_res_body.pagebean.contentlist" :key="index" :header="DiseaseItem.name" @click="SearchDisease(DiseaseItem.id)">
      
           <div class="space" style="height: auto;">
            <span class="text" >疾病名称：</span>{{ DiseaseItem.name }}<br><br>
            <span class="text" >一级科室：</span>{{ DiseaseItem.typeName }}<br><br>
            <span class="text" >二级科室：</span>{{ DiseaseItem.subTypeName }}<br><br>
            <span class="text ">简介：</span><span style="line-height: 1.5em;">{{ DetailData.showapi_res_body.item.summary }}</span>
            <div class="kh">konghang</div>
          </div>
      </va-collapse>
      </va-accordion>
    </div>

    <div  style="flex">
      <va-card stripe class="tip">
        <va-card-content class="title">健康资讯</va-card-content>
          <!-- 遍历新闻数据并显示 -->
          <div  v-for="(newsItem,index) in newsData.showapi_res_body.pagebean.contentlist.slice(0, 7)" :key="newsItem.id" class="news-item">
          
            <va-card style="width:370px;display: flex;">
              <!-- 左侧图片 -->
              <div style="display: flex:1;">
                <img  class="news-image" :src="img[index]"/></div>
              <!-- 右侧标题、简介和时间 -->
              <a :href="newsItem.url" target="_blank">
              <div class="news-info" style="display: flex:3;">
                <h2>{{ newsItem.title }}</h2><br>
                <div>{{ newsItem.ctime }}</div>
              </div></a>
            </va-card>
          </div>
      </va-card>
    </div>
    </div>

  </div>


</template>
<style>
#main-page {
  margin-top: 12px;
  margin-left: 20%;
  margin-right: 14%;
}
.bgImage {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.card {
  margin-bottom: 20px;
  padding: 20px;
}
.kh{
  color: rgba(0, 0, 0, 0);
}

.button-group{
    margin-top: 20px;
    display: flex;
}
.text{
  font-weight: bold;
}
.space{
  margin: 4px;
}
.tip{
  width:300px;
  display: flex;
  flex-wrap: wrap;

}
.title{
  font-weight: bold;
  font-size: larger;
  
  margin-left:20px;
}

.news-item {
  display: flex;
  margin-bottom: 20px;
}

.news-image {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.news-info {
  flex-grow: 1;
}
p {
  font-size: 14px;
  margin: 0;
  margin-bottom: 5px;
}
a {
  text-decoration: none;
  color: black;
  font-size: 14px;
}
.max-w-sm{
  min-width: 70%;
}
* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}

</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      
      selectedCategory: '', // 存储选中的类别
      searchKeyword: '', // 用户输入的搜索关键词
      newsData: {
        showapi_res_body: {
          pagebean: {
            contentlist: []
          }
        }
      },
      value: [], // 初始化为一个空数组
      DiseaseData: {
        showapi_res_body: {
          pagebean: {
            contentlist: []
          }
        }
      },
      img:[
      require("../../assets/diseaseImg/img-1.jpg"),require("../../assets/diseaseImg/img-2.jpg"),require("../../assets/diseaseImg/img-3.jpg"),
      require("../../assets/diseaseImg/img-4.jpg"),require("../../assets/diseaseImg/img-5.jpg"),require("../../assets/diseaseImg/img-6.jpg"),
      require("../../assets/diseaseImg/img-7.jpg"),
      ],
      DetailData:{
        showapi_res_body: {
          item: {
            tagList:[]
          }
        }
      }
     
    };
  },
  methods: {
    //获取新闻信息
    fetchNewsData() {
      var self = this; // 存储当前对象的引用
      const d = new Date();
      
      // 创建请求参数对象
      const formData = new FormData();
      formData.append("showapi_timestamp", d);
      formData.append("showapi_appid", '1475668'); // 这里需要改成自己的appid
      formData.append("showapi_sign", '2c780d7234d547a49d4df8a0e9331f2d'); // 这里需要改成自己的应用的密钥secret
      formData.append("tid", "100");
      formData.append("key", "");
      formData.append("page", "1");

      // 发送POST请求
      axios
        .post("http://route.showapi.com/90-87", formData)
        .then(function (response) {
          self.newsData = response.data;
          console.log(self.newsData);
        })
        .catch(function (error) {
          console.error(error);
          alert("操作失败!");
        });
    },
    //获取疾病信息
    fetchDiseaseData(searchKeyword) {
      var self = this; // 存储当前对象的引用  
      // 创建请求参数对象
      const formData = new FormData();
     
      formData.append("showapi_appid", '1475668'); 
      formData.append("showapi_sign", '2c780d7234d547a49d4df8a0e9331f2d'); 
      formData.append("typeId", "");
      formData.append("subTypeId", "");
      formData.append("key",searchKeyword);
      formData.append("page", "1");

      // 发送POST请求
      axios
        .post("http://route.showapi.com/546-2", formData)
        .then(function (response) {
          self.DiseaseData = response.data;
          console.log(self.DiseaseData);
        })
        .catch(function (error) {
          console.error(error);
          alert("操作失败!");
        });
    },
    SearchDisease(id){
      var self = this; // 存储当前对象的引用  
      const d = new Date();
      // 创建请求参数对象
      const formData = new FormData();
     
      formData.append("showapi_timestamp", d);
      formData.append("showapi_appid", '1475668');
      formData.append("showapi_sign", '2c780d7234d547a49d4df8a0e9331f2d'); 
      formData.append("id", id);
      
      // 发送POST请求
      axios
        .post("http://route.showapi.com/546-3", formData)
        .then(function (response) {
          self.DetailData = response.data;
          console.log(self.DetailData);
        })
        .catch(function (error) {
          console.error(error);
          alert("操作失败!");
        });

    },
     // 计算属性：根据索引获取图片 URL
     getImageUrl(index) {
      return () => {
        // 检查索引是否越界
        if (index >= 0 && index < this.img.length) {
          console.log(this.img[index]);
          return this.img[index];
        } else {
          // 如果索引越界，可以返回默认图片或者其他处理方式
          return "https://picsum.photos/200";
        }
      };
    },

  },
  mounted() {
    // 在组件挂载时调用fetchData方法获取新闻数据
    this.fetchNewsData();
    this.fetchDiseaseData('口腔');
    
    
  }
};

</script>