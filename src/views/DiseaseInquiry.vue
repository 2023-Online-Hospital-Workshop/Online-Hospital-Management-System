<template>
  <div id="main-page">
    <h1 class="va-h3">常见病信息查询</h1>
    <div>
    
      <va-card class="card">
      
      <div class="flex flex-row">
        
        <va-card class="search-card">
          <div class="search-container">
            <va-input v-model="searchKeyword" placeholder="输入关键词进行搜索"></va-input>
            <va-button color="primary" @click="search">搜索</va-button>
          </div>
        </va-card>
        <div class="button-group">
            <va-button-group preset="secondary" border-color="primary">

            <va-button @click="filterCard('呼吸道感染类')">呼吸道感染类</va-button>
            <va-button @click="filterCard('消化道感染类')">消化道感染类</va-button>
            <va-button @click="filterCard('皮肤感染类')">皮肤感染类</va-button>
            <va-button @click="filterCard('寄生虫感染类')">寄生虫感染类</va-button>
            <va-button @click="filterCard('泌尿道感染类')">泌尿道感染类</va-button>
            <va-button @click="filterCard('眼部感染类')">眼部感染类</va-button>
            </va-button-group>
        </div>
      </div>
    </va-card>

    </div>
    <div class="flex flex-wrap gap-5">
      <va-card
        v-for="card in filteredCards"
        :key="card.title"
        square
        outlined
      >
        <va-card-title>{{ card.title }}</va-card-title>
        <va-card-content>
          <!-- 显示卡片的内容 -->
           <div class="space" >
            <span class="text">症状：</span>{{ card.symptoms }}
          </div>
          <div class="space" >
            <span class="text">治疗：</span>{{ card.treatment }}
          </div>
          <div class="space">
            <span class="text">对应科室：</span>{{ card.department }}
          </div>
           
        </va-card-content>
      </va-card>
    </div>

  </div>


</template>
<style>
#main-page {
  margin-left: 14%;
  margin-right: 14%;
}
.card {
  margin-bottom: 20px;
  padding: 20px;
  
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

</style>
<script>
export default {
  data() {
    return {
      cards: [
        {
          title: '普通感冒',
          category: '呼吸道感染类',
          symptoms: '流感、喉咙痛、鼻塞、咳嗽、头痛、发热、肌肉疼痛。',
          treatment: '休息、饮水、非处方药物如解热镇痛药（如对乙酰氨基酚）来缓解症状。',
          department: '内科医生或全科医生的诊所。',
          
          // 其他卡片数据
        },
        {
          title: '流行性感冒',
          category: '呼吸道感染类',
          symptoms: '高热、头痛、肌肉疼痛、咳嗽、喉咙痛、疲劳。',
          treatment: '休息、饮水、抗流感药物（如奥司他韦）。',
          department: '内科医生或全科医生的诊所。',
          
          // 其他卡片数据
        },
        {
          title: '肺炎',
          category: '呼吸道感染类',
          symptoms: '发热、咳嗽、呼吸急促、胸痛、咳痰。',
          treatment: '抗生素（如果是细菌性感染）、休息、液体补充。',
          department: '内科医生或全科医生的诊所。',
         
          // 其他卡片数据
        },
        // 添加其他卡片数据
        {
          title: '腹泻',
          category: '消化道感染类',
          symptoms: '腹泻、呕吐、腹痛、发热、脱水。',
          treatment: '补充液体、休息、抗生素（如果是细菌性感染）',
          department: '内科、胃肠科。',
         
          // 其他卡片数据
        },
      ],
      selectedCategory: '', // 存储选中的类别
      searchKeyword: '', // 用户输入的搜索关键词

    };
  },
  computed: {
    filteredCards() {
      // 根据选中的类别筛选卡片
      if (!this.selectedCategory&& !this.searchKeyword) {
        return this.cards; // 如果没有选中类别，显示所有卡片
      }
      
      return this.cards.filter(card =>  {
        // 根据选中的类别筛选
        const categoryMatch = !this.selectedCategory || card.category === this.selectedCategory;
        
        // 根据搜索关键词筛选，如果关键词为空，则不进行关键词匹配
        const keywordMatch = !this.searchKeyword || card.title.toLowerCase().includes(this.searchKeyword.toLowerCase());

        // 返回满足类别和关键词匹配的卡片
        return categoryMatch && keywordMatch;
      });
    },
  },
  methods: {
    filterCard(category) {
      // 设置选中的类别
      this.selectedCategory = category;
    },
  },
};

</script>