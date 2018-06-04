<template>
	<div class="web-container">
		<!-- <cube-scroll> -->
		<cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
			<cube-form-group>
				<!-- 照片上传验证-input -->
				<cube-upload ref="upload" :action="action" :simultaneous-uploads="1" :process-file="processFile" @file-submitted="fileSubmitted" :max=1 @files-added="fileAdded" v-model="fileArr" />
				<!-- 手机号码-input -->
				<cube-form-item :field="fields[1]"></cube-form-item>
				<!-- 名字-input -->
				<cube-form-item :field="fields[2]"></cube-form-item>
				<!-- 身份证-input -->
				<cube-form-item :field="fields[3]"></cube-form-item>
				<!-- 性别-picker -->
				<cube-form-item :field="fields[4]">
					<!-- <cube-button @click="showPicker">Picker</cube-button> -->
				</cube-form-item>
				<!-- 生日 时间date-picker -->
				<cube-form-item :field="fields[5]">
					<cube-button @click="showDatePicker" :class="{active:model.dateValue}">{{model.dateValue||'生日'}}</cube-button>
					<i class="cube-select-icon"></i>
				</cube-form-item>
				<!-- 所在地 -->
				<div style="position:relative" :class="{black: model.pcaValue.length}">
					<cube-form-item :field="fields[6]"></cube-form-item>
					<i class="cube-select-icon"></i>
				</div>
				<div class="border-box"></div>
				<!-- 级别选择 picker -->
				<cube-form-item :field="fields[7]"></cube-form-item>
				<!-- 善长-下拉多选 -->
				<cube-form-item :field="fields[8]" :class="{black: model.checkboxGroupVal}">
					<cube-button @click="getCheckData">{{model.checkboxGroupVal || '擅长'}}</cube-button>
					<i class="cube-select-icon"></i>
				</cube-form-item>
				<!-- 单位-input -->
				<cube-form-item :field="fields[9]"></cube-form-item>
				<!-- 职称-input -->
				<cube-form-item :field="fields[10]"></cube-form-item>
				<!-- 简介-texterae -->
				<cube-form-item :field="fields[11]"></cube-form-item>
			</cube-form-group>
			<cube-form-group>
				<div class="sub-box">
					<cube-button type="submit" :class="{blacks:!valid}">提交申请</cube-button>
				</div>
			</cube-form-group>
		</cube-form>
		<!-- </cube-scroll> -->
		<GoodAt ref="checkboxGroups" @confimSure="makeSure" :getOptions="op"></GoodAt>
		<date-picker ref="datePicker" :min="[2008, 8, 8]" :max="[2020, 10, 20]" @select="dateSelectHandler"></date-picker>
	</div>
</template>

<script>
import { DatePicker } from 'cube-ui'
import { cityData } from '../data/area'
import GoodAt from './goodAt'
import Axios from 'axios'
import compress from '../imageUtil/image'
// province, city, area
// select component
const root = process.env.API_ROOT

const PCA = {
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		},
		pcaBalck:{
			type:String,
			default:''
		}
	},
	data() {
		return {
			selected: []
		}
	},
	render(createElement) {
		return createElement(
			'cube-button',
			{
				on: {
					click: this.showPicker
				}
			},
			this.selected.length ? this.selected.join(' ') : '所在地'
		)
	},
	mounted() {
		this.picker = this.$createCascadePicker({
			title: '所在地',
			data: cityData,
			selectedIndex: this.value,
			onSelect: this.selectHandler
		})
	},
	methods: {
		showPicker() {
			this.picker.show()
		},
		selectHandler(selectedVal, selectedIndex, selectedTxt) {
			this.selected = selectedTxt
			this.$emit('input', selectedTxt)
		}
	}
}
export default {
	data() {
		let that = this
		return {
			fileArr:[],
			isBlack:false,
			action:{
				target:`${root}/getskillAndtype`,
				prop: 'base64Value'
			},
			validity: {},
			valid: false,
			userTypes :[],
			userPostType:[],
			skills:[],
			skillsPost:[],
			model: {
				uploadValue: '', //头像图片
				inputValue: '', //手机号
				inputName: '', //名字
				inputCard: '', //身份证
				selectValue: '', //性别
				dateValue: '', //生日
				pcaValue: [], //地址所在地
				levelValue: '', //级别
				checkboxGroupVal: '', //擅长
				jobAds: '', //单位
				jobTitle: '', //职称
				textareaValue: '' //简介
			},
			op: [],
			opCopy:[],
			fields: [
				{
					type: 'upload',
					modelKey: 'uploadValue',
					events: {
						'file-removed': (...args) => {
							console.log('file removed', args)
						}
					},
					 rules: {
					
					},
					messages: {
						uploaded: '上传失败'
					}
				},
				{
					type: 'input',
					modelKey: 'inputValue',
					label: ' ',
					props: {
						placeholder: '手机号'
					},
					rules: {
						required: true,
						type: 'tel',
						max: 11
					},
					messages:{
						required:'提交失败，请信息修改后再提交'
					}
				},
				{
					type: 'input',
					modelKey: 'inputName',
					label: ' ',
					props: {
						placeholder: '名字'
					},
					rules: {
						required: true
					}
				},
				{
					type: 'input',
					modelKey: 'inputCard',
					label: ' ',
					props: {
						placeholder: '身份证'
					},
					rules: {
						required: false,
						max: 18
					}
				},
				{
					type: 'select',
					modelKey: 'selectValue',
					label: ' ',
					props: {
						options: ['男', '女'],
						placeholder: '性别'
					},
					rules: {
						required: false
					}
				},
				{
					modelKey: 'dateValue',
					label: ' ',
					rules: {
						required: false
					}
				},
				{
					component: PCA,
					modelKey: 'pcaValue',
					label: ' ',
					rules: {
						required: false
					},
					messages: {
						required: '请选择'
					},
					icon: 'cube-select-icon'
				},
				{
					type: 'select',
					modelKey: 'levelValue',
					label: ' ',
					props: {
						options: [],
						placeholder: '级别'
					},
					rules: {
						required: false
					}
				},
				{
					modelKey: 'checkboxGroupVal',
					label: ' ',
					rules: {
						required: false
					}
				},
				{
					type: 'input',
					modelKey: 'jobAds',
					label: ' ',
					props: {
						placeholder: '单位'
					},
					rules: {
						required: false
					}
				},
				{
					type: 'input',
					modelKey: 'jobTitle',
					label: ' ',
					props: {
						placeholder: '职称'
					},
					rules: {
						required: false
					}
				},
				{
					type: 'textarea',
					modelKey: 'textareaValue',
					label: ' ',
					props: {
						placeholder: '简介',
						maxlength:400
					},
					rules: {
						required: false
					}
				}
			]
		}
	},
	created(){
		this.getStaticData(`${root}/getskillAndtype`).then(res => {
			let dataArray = res.data.data.usertype
			let skillsArray = res.data.data.skills
			 // res.data.data.usertype
			for(let i in dataArray){
				this.userTypes.push(dataArray[i].name)
				this.userPostType.push(dataArray[i].id)
			}
			for(let i in skillsArray){
				this.op.push({
					label:skillsArray[i].name,
					value:skillsArray[i].name
					})
				this.opCopy.push(skillsArray[i].name)	
				// this.skillsPost.push(skillsArray[i].fid)
			}
			for (let i in this.fields){
				if(this.fields[i].modelKey ==='levelValue' ){
					this.fields[i].props.options = this.userTypes
				}
			}
		})
	},
	methods: {
		fileAdded(){
			const file = this.fileArr[0]
			file && this.$refs.upload.removeFile(file)
			this.model.uploadValue = this.fileArr[0]
		},
    processFile(file, next) {
      compress(file, {
        compress: {
          width: 1600,
          height: 1600,
          quality: 0.5
        }
      }, next)
    },
    fileSubmitted(file) {
			file.base64Value = file.file.base64
			this.model.uploadValue = file.file.base64
    },
		//弹窗
		showClose(title) {
			this.$createDialog({
				type: 'alert',
				icon: 'cubeic-sad',
				showClose: true,
				title: title,
				confirmBtn: {
          text: '我知道了',
          active: true
        },
				onClose: () => {
					
				}
			}).show()
		},
		getStaticData(url){
			return Axios.get(url).then(res => {
				return Promise.resolve(res)
			}).catch(err => {
				return Promise.reject(err)
			})
		},
		getLevelValue(val,arr){
			let i = arr.findIndex((v) => v == val)
			return this.userPostType[i]
		},
		postData(url, options) {
			return Axios.post(url, {
				avatar: options.uploadValue, //头像
				mobile: options.inputValue, //手机号
				nickname: options.inputName, //名字
				idcard: options.inputCard, //身份证
				sex: options.selectValue == '' ? '' : options.selectValue === '男' ? 'm' : 'f', //性别
				birthday: options.dateValue, //生日
				province: options.pcaValue[0], //省
				city: options.pcaValue[1], //市
				county: options.pcaValue[2], //镇
				usertype: this.getLevelValue(options.levelValue,this.userTypes), //级别
				skill: this.skillsPost.join(','), //需要做成 1， 2，3 格式 --- 善长
				company: options.jobAds, //单位
				duty: options.jobTitle, //职称
				introduction: options.textareaValue //简介
			})
				.then(function(response) {
					return Promise.resolve(response.data)
				})
				.catch(function(err) {
					return Promise.reject(response.data)
				})
		},
		submitHandler(e) {
			e.preventDefault()
			this.postData(`${root}/expertapply`, this.model)
				.then(res => {
					if (res.code == 200) {
						this.$router.push({ path: '/Result' })
					} else {
						this.showClose(res.message)
						return;
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		validateHandler(result) {
			this.validity = result.validity
			this.valid = result.valid
			this.subBlack = true
		},
		showDatePicker() {
			this.$refs.datePicker.show()
		},
		dateSelectHandler(data, selectedVal, selectedTxt) {
			this.model.dateValue = selectedVal.join('.')
		},
		getCheckData() {
			this.$refs.checkboxGroups.show()
			// console.log(this.model.uploadValue[0].base64)
		},
		makeSure(data) {
			this.skills = data
			this.skills.forEach((item,index) => {
				
				let i = this.opCopy.findIndex(val => val == item)
				this.skillsPost.push(i)
			})
			this.model.checkboxGroupVal = data.join("、")
		}
	},
	watch:{
		'model.levelValue':function (newVal,oldVal){
				let i = this.userTypes.findIndex((v) => v == newVal)
				// return this.userPostType[i]
		},
		'valid'(newVal,oldVal){
			if(newVal === undefined) {
				this.valid = true
			}
		}
	},
	components: {
		DatePicker,
		GoodAt
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.border-box
	height 20px
	background #EBEAE0
bg-img($url)
	background-image url($url + '@2x.png')
	background-size cover
	background-position center
	background-repeat no-repeat
	@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
		background-image url($url + '@3x.png')
		background-size cover
		background-position center
		background-repeat no-repeat
.icon-box
	width 25px
	position absolute
	top 15px
.inputValue
	width 20px
	height 22px
	bg-img('../src/assets/images/iphone')
.inputName
	width 20px
	height 22px
	bg-img('../src/assets/images/person')
.pcaValue
	width 20px
	height 22px
	bg-img('../src/assets/images/pca')
.levelValue
	width 20px
	height 22px
	bg-img('../src/assets/images/level')
.checkboxGroupVal
	width 20px
	height 22px
	bg-img('../src/assets/images/goodat')
.jobAds
	width 20px
	height 22px
	bg-img('../src/assets/images/jobAds')
.textareaValue
	width 20px
	height 22px
	bg-img('../src/assets/images/info')
.cube-validator-content
	.cube-btn
		background none !important
		color #999 !important
		font-size 14px !important
		text-align left
		padding-left 0 !important
		color #cfcfcf !important
		white-space normal !important
		line-height inherit !important
		padding-right 0.44rem
		&.active
			color #282828 !important
.sub-box
	background #EBEAE0
	padding 30px 0
	.cube-btn
		width 70%
		margin 0 auto
		background #FDC705
		color #282828
		border-radius 40px
		font-size 19px
		padding 0
		line-height 40px
.cube-input_active
	border-bottom 1px solid #FDC705
.cube-select-icon
	width 14px
	height 9px
	border 0 solid transparent !important
	bg-img('../src/assets/images/select')
.black
	.cube-validator-content
		.cube-btn
			color #282828 !important
.blacks
	background rgba(187, 187, 187, 1) !important
	color #282828 !important
.cube-upload-file-status.cubeic-right
	display none !important
.cube-upload-file-def
	border-radius 100% !important
.cube-upload-file-def
	& > .cubeic-wrong, .cube-upload-file_stat
		display none !important
.web-container
	overflow hidden
	.cube-upload-def
		height 110px
		.cube-upload-def .cube-upload-btn, .cube-upload-file
			position absolute
.cube-form-item_invalid
	.cube-input
		border-bottom 1px solid red
		border-radius 0
.cube-btn.cube-btn_active::after, .cube-btn:active::after
	border 0px solid #fff !important
.cubeic-sad
	width 25px
	height 25px
	border 0 solid transparent !important
	bg-img('../src/assets/images/sad-icon')
	background-color #fff !important
</style>