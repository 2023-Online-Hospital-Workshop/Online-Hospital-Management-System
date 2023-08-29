<template>
  <div class="wrap">
    <div id="pdfDom" style="padding: 10px;">
      <el-table :data="tableData" border>
        <el-table-column prop="date" label="日期" width="250"></el-table-column>
        <el-table-column prop="name" label="姓名" width="250"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
    <button type="button" class="wide-button" @click="btnClick">导出PDF</button>
  </div>
</template>
 
<script>
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  name: "ExportPDF",
  data() {
    return {
      exportPDFtitle: "页面导出PDF文件名",
      tableData: [
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '重庆市九龙坡区火炬大道'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '重庆市九龙坡区火炬大道'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
      ]
    };
  },
  mounted() {

  },
  methods: {
    btnClick() {
      // 当下载pdf时，若不在页面顶部会造成PDF样式不对,所以先回到页面顶部再下载
      let top = document.getElementById('pdfDom');
      if (top != null) {
        top.scrollIntoView();
        top = null;
      }
      let title = this.exportPDFtitle;
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(function (canvas) {
        // 获取canvas画布的宽高
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        let pageHeight = contentWidth / 841.89 * 592.28;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面偏移
        let position = 0;
        // html页面生成的canvas在pdf中图片的宽高（本例为：横向a4纸[841.89,592.28]，纵向需调换尺寸）
        let imgWidth = 841.89;
        let imgHeight = 841.89 / contentWidth * contentHeight;
        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        let PDF = new JsPDF('l', 'pt', 'a4');
        // 两个高度需要区分: 一个是html页面的实际高度，和生成pdf的页面高度
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight;
            position -= 592.28;
            // 避免添加空白页
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        // PDF.save(title + '.pdf')
        console.log(title);
        const blob = PDF.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');  // 在新窗口中打开 PDF 文件
      })
    },
  },
};
</script>
 
<style scoped>
.wide-button {
  width: 80%;
  /* 设置按钮宽度为屏幕宽度的80% */
  margin-bottom: 20px;
}
</style>