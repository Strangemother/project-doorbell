/****************************************************************************
 ** @license
 ** This file is part of yFiles for HTML 2.1.0.6.
 ** 
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2018 by yWorks GmbH, Vor dem Kreuzberg 28, 
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
!function(a){!function(b){"function"==typeof define&&define.amd?define(["./lang","./core-lib","./graph-core","./graph-styles-core","./graph-styles-template","./graph-table"],b):"object"==typeof exports&&"undefined"!=typeof module&&"object"==typeof module.exports?module.exports=b(require("./lang"),require("./core-lib"),require("./graph-core"),require("./graph-styles-core"),require("./graph-styles-template"),require("./graph-table")):b(a.yfiles.lang,a.yfiles)}(function(a,b){return function(a,b,c,d){"use strict";function e(b){return a.T.WIB.INSTANCE}function f(b,c,d){var e=null!==d?a.YP.$m4(a.PW.$class,d):null;null!==e&&(c.$f8=e.$f1,c.$f9=d,c.$f10=b.$MXz(),c.$f11=b.$GYz())}function g(b,c,d){var e=a.YP.$m4(a.PW.$class,d);return!(c.$f11===b.$GYz()&&c.$f8===e.$f1&&null!==c.$f9&&c.$f9.equals(d)&&(null===c.$f10&&null===b.$MXz()||null!==c.$f10&&c.$f10.equals(b.$MXz())))}function h(b,c,d,e,f){f=j(b,c,d,e,f);var g;for(g=a.XW.$m7(c).$fL();g.$TR();){f=h(b,g.$PR,d,e,f)}return f}function i(b,c,d,e,f){f=k(b,c,d,e,f);var g;for(g=a.XW.$m7(c).$fL();g.$TR();){f=i(b,g.$PR,d,e,f)}return f}function j(b,c,d,e,f){var g=a.YP.$m4(a.C.YYA.$class,c);if(null!==g){var h,i=(h=g.$yZ(e))instanceof a.C.NKB?h:null;d.$Ury(i),f++}return f}function k(b,c,d,e,f){var g=d.$f6.$iL(f),h=a.YP.$m4(a.C.YYA.$class,c);if(null!==h){var i,j=(i=h.$mf(e,g))instanceof a.C.NKB?i:null;j!==g&&(d.$f6.$mM(f,j),a.NI.$m(e,g)),f++}return f}function l(b,c,d){var e=new a.C.YCB;e.$f6=new a.C.EAB.$q(a.T.OZA.ORIGIN,a.BQ.$m17(c.$dT));var f=e,g=b.$SUz();null!==g&&(f.$f9=a.JQ.$m8(f.$f9,a.JQ.$m7(g,a.C.TUB.$class)));var h=b.$MXz();if(null!==h){var i;return(i=h.$MM.$Wf(f,h).$yZ(d))instanceof a.C.NKB?i:null}return null}function m(b,c,d,e){var f=new a.C.YCB;f.$f6=new a.C.EAB.$q(a.T.OZA.ORIGIN,a.BQ.$m17(c.$dT));var g=f,h=b.$SUz();null!==h&&(g.$f9=a.JQ.$m8(g.$f9,a.JQ.$m7(h,a.C.TUB.$class)));var i=b.$MXz();if(null!==i){var j;return(j=i.$MM.$Wf(g,i).$mf(d,e))instanceof a.C.NKB?j:null}return null}b.lang.addMappings("yFiles-for-HTML-Complete-2.1.0.6-Evaluation (Build 4f35f10f095a-12/08/2018)",{_$_kea:["loadAllTemplates","$m"],get _$_lea(){return["$n",b.lang.decorators.Overload("TemplateStripeStyleBase",0)]},get _$_mea(){return["$o",b.lang.decorators.Overload("TemplateStripeStyleBase",0,b.lang.decorators.Arg("yfiles._R.C.STB"))]},_$_nea:["CONVERTERS","$m"],_$_oea:["CONVERTERS","$m"],_$_vva:["createTemplate","$NQ"],_$_uvc:["layout","$ds"],_$_uyd:["contextLookup","$uKy"],_$_bli:["node","$QSz"],_$_xli:["style","$mTz"],_$_yli:["style","$nTz"],_$_fmi:["stripe","$uTz"],_$_dpi:["getTable","$SUz"],_$_mqi:["configure","$BVz"],_$_nqi:["configure","$CVz"],_$_xui:["getBackgroundStyle","$MXz"],_$_rwi:["getTableRenderingOrder","$GYz"],_$_zcj:["copyTable","$Obz"],_$_rlj:["getContextLookup","$gfz"],_$_vmj:["onPropertyChanged","$Ogz"],_$_fpj:["copyBackgroundStyle","$Yhz"],_$_gnl:["TemplateStripeStyleBase","PTB"],get _$_hnl(){return["StringTemplateStripeStyle","RTB",b.lang.decorators.OptionArgs(b.lang.decorators.Arg(String,"svgContent",null),b.lang.decorators.Arg("yfiles._R.C.STB","renderer",null),b.lang.decorators.SetterArg("styleTag"))]},_$_inl:["TemplateStripeStyleRenderer","STB"],_$_jnl:["TableNodeStyleRenderer","UTB"],_$$_ds:["table","$Yp"],_$$_xw:["styleTag","$Xx"],_$$_qy:["svgContent","$cC"],_$$_hba:["backgroundStyle","$dPy"],_$$_uba:["styleResourceKey","$NSy"],get _$$_rca(){return["tableRenderingOrder","$MZy",b.lang.decorators.Type("yfiles._R.C.TVB",4)]},_$$_jfa:["onPropertyChanged","$Ngz"],_$$_hma:["yfiles.styles","yfiles._R.T","yfiles._R.C"],get _$$_ima(){return["TemplateStripeStyle","QTB",b.lang.decorators.OptionArgs(b.lang.decorators.Arg(String,"styleResourceKey",null),b.lang.decorators.Arg("yfiles._R.C.STB","renderer",null))]},get _$$_jma(){return["TableNodeStyle","TTB",b.lang.decorators.OptionArgs(b.lang.decorators.Arg("yfiles._R.C.TUB","table",null),b.lang.decorators.Arg("yfiles._R.C.UTB","renderer",null),b.lang.decorators.SetterArg("backgroundStyle"),b.lang.decorators.SetterArg("tableRenderingOrder","yfiles._R.C.TVB"))]}});var n=["Lookups.EmptyContextLookup","content","styleTag","renderer","styleResourceKey","StripeTemplateId","svgContent","TableNodeStyle.defaultBackgroundStyle","table"];b.lang.module("_$$_hma",function(c){c._$_gnl=new b.lang.ClassDefinition(function(){return{$abstract:!0,$with:[a.C.OVB,a.C.HTA,a.C.ITA],constructor:{_$_lea:function(){this.$$init$$()},_$_mea:function(b){this.$$init$$(),this.$f1=null!==b?b:new a.C.STB}},$f2:null,$f4:null,$f1:null,$f:null,$e:null,"$YR!":function(a){this.$e=b.lang.delegate.combine(this.$e,a)},"$ZR!":function(a){this.$e=b.lang.delegate.remove(this.$e,a)},"_$$_xw!":{$meta:function(){return[a.YD.$c(null),b.lang.TypeAttribute(b.lang.Object.$class)]},get:function(){return this.$f2},set:function(b){this.$f2!==b&&(this.$f2=b,this.$Ngz(a.T.PTB.$f))}},"_$_uyd!":{$meta:function(){return[a.YD.$c1(a.EK.$class,n[0])]},get:function(){return this.$f4},set:function(b){this.$f4=null!==b?b:a.KQ.$f}},_$$_jfa:function(a){null!==this.$e&&this.$e(this,a)},clone:function(){var b=a.C.PTB.$super.memberwiseClone.call(this);b.$e=null;var c=a.C.ITA.isInstance(this.$f2)?this.$f2:null;return b.$Xx=null!==c?c.clone():this.$f2,b},"$MU!":{get:function(){return this.$f1}},_$_vva:function(b,c){var d=this.$m(b),e=new a.TV;if(e.$m13(b,c,this),null!==d){var f=d.$m(c.$QS,e,b,!0);e.$m(f)}var g=function(a,f){if(f.$rS===n[1]&&null!==d){var g=d.$m(c.$QS,e,b,!0);e.$m(g)}};return e.$YR(g),e},$m:b.lang.Abstract,$$init$$:function(){this.$f4=a.KQ.$f},$static:{$f:null,"_$_kea!":function(){a.BW.$m3()},$clinit:function(){a.T.PTB.$f=new a.C.GTA(n[2])}}}})}),b.lang.module("_$$_hma",function(c){c._$$_ima=new b.lang.ClassDefinition(function(){return{$extends:a.C.PTB,constructor:function(b,c){if(a.C.PTB.$o.call(this,c),null===c)throw a.PE.$m21(n[3]);this.$NSy=b},$f3:null,"_$$_uba!":{$meta:function(){return[a.YD.$c(null),b.lang.TypeAttribute(b.lang.String.$class)]},get:function(){return this.$f3},set:function(b){b!==this.$f3&&(this.$f3=b,this.$Ngz(a.T.QTB.$f))}},"$m!":function(b){var c=null;return null===this.$f&&(this.$f=a.BW.$m10(this.$f3,document)),null!==this.$f&&(c=this.$f.$f1.$hL(this.$f3),this.$f.$m(b)),c},$static:{$f:null,"_$_nea!":{$meta:function(){return[b.lang.TypeAttribute(b.lang.Object.$class)]},get:function(){return a.IP.$f4}},$clinit:function(){a.T.QTB.$f=new a.C.GTA(n[4])}}}})}),b.lang.module("_$$_hma",function(c){c._$_hnl=new b.lang.ClassDefinition(function(){return{$extends:a.C.PTB,constructor:function(b,c){a.C.PTB.$o.call(this,c),this.$cC=b},$f3:null,"_$$_qy!":{$meta:function(){return[a.YD.$c(null),a.C.WUA().init({writeAsAttribute:1}),b.lang.TypeAttribute(b.lang.String.$class)]},get:function(){return this.$f3},set:function(b){this.$f3!==b&&(this.$f3=b,a.LF.$m4(this.$f3)?this.$f=null:this.$f=a.BW.$m11(this.$f3,a.T.RTB.$f),this.$Ngz(a.T.RTB.$f1))}},"$m!":function(b){if(null===this.$f)return null;var c=this.$f.$f1.$hL(a.T.RTB.$f);return this.$f.$m(b),c},$static:{$f1:null,"_$_oea!":{get:function(){return a.IP.$f4}},$f:n[5],$clinit:function(){a.T.RTB.$f1=new a.C.GTA(n[6])}}}})}),b.lang.module("_$$_hma",function(c){c._$_inl=new b.lang.ClassDefinition(function(){return{$with:[a.C.PVB,a.C.RLB,a.C.YYA],$f:null,$f1:null,"_$_xli!":{get:function(){return this.$f},set:function(a){this.$f=a}},"_$_fmi!":{get:function(){return this.$f1},set:function(a){this.$f1=a}},_$_mqi:function(){},$Yf:function(b,c){var d=c instanceof a.C.PTB?c:null;return null!==d?(this.$f=d,this.$f1=b,this.$BVz(),this):a.T.ZYA.INSTANCE},$Ye:function(b,c){var d=c instanceof a.C.PTB?c:null;return null!==d?(this.$f=d,this.$f1=b,this):a.JQ.$f},"_$_uvc!":{get:function(){return this.$f1.$jT}},$yZ:function(a){return this.$f.$NQ(a,this.$f1)},$mf:function(b,c){var d=c instanceof a.TV?c:null;return null!==d?(d.$m12(b,this.$f1,this.$f),d):(a.NI.$m(b,c),this.$yZ(b))},_$_rlj:function(a){return a.$f4},$GY:function(b){if(b===a.C.YYA.$class)return null;var c=this.$gfz(this.$f).$yN(this.$f1,b);return null!==c?c:b.isInstance(this)?(this.$BVz(),this):null}}})}),b.lang.module("_$$_hma",function(c){c._$$_jma=new b.lang.ClassDefinition(function(){return{$with:[a.C.YIB,a.C.HTA],constructor:function(b,c){this.$$init$$(),this.$f1=null!==c?c:new a.C.UTB,this.$f=null!==b?b:new a.C.HVB},$f2:null,$f3:0,$f1:null,"_$$_rca!":{$meta:function(){return[a.YD.$c(0),b.lang.TypeAttribute(a.C.TVB.$class)]},get:function(){return this.$f3},set:function(a){this.$f3=a}},"_$$_hba!":{$meta:function(){return[a.YD.$c1(a.T.TTB.T.$class,n[7]),b.lang.TypeAttribute(a.C.YIB.$class)]},get:function(){return this.$f2},set:function(a){this.$f2=a}},$e:null,"$YR!":function(a){this.$e=b.lang.delegate.combine(this.$e,a)},"$ZR!":function(a){this.$e=b.lang.delegate.remove(this.$e,a)},_$_vmj:function(a){null!==this.$e&&this.$e(this,a)},clone:function(){var a=this.memberwiseClone();return a.$f2=this.$Yhz(this.$f2),a.$f=this.$Obz(this.$f),a},_$_fpj:function(a){return a},_$_zcj:function(b){return a.C.ITA.isInstance(b)?b.clone():b},$f:null,"_$$_ds!":{$meta:function(){return[b.lang.TypeAttribute(a.C.TUB.$class)]},get:function(){return this.$f},set:function(b){this.$f!==b&&(this.$f=b,this.$Ogz(new a.C.GTA(n[8]))),this.$f=b}},"$MM!":{$meta:function(){return[b.lang.TypeAttribute(a.C.ZIB.$class)]},get:function(){return this.$f1}},$$init$$:function(){this.$f2=a.T.WIB.INSTANCE},$static:{T1:new b.lang.ClassDefinition(function(){return{$extends:a.C.WKB,$final:!0,constructor:function(){a.C.WKB.call(this)},"$zPz!":function(a,b){return e(a)},"$ZPz!":function(a,b){return!0}}}),T:new b.lang.ClassDefinition(function(){return{$final:!0,$meta:function(){return[a.C.WUA().init({valueSerializer:a.T.TTB.T1.$class})]}}})}}})}),b.lang.module("_$$_hma",function(c){c._$_jnl=new b.lang.ClassDefinition(function(){return{$with:[a.C.ZIB,a.C.FJB,a.C.QYA,a.C.RYA,a.C.VYA,a.C.SYA,a.C.RLB,a.C.YYA],$f1:null,$f:null,"_$_yli!":{get:function(){return this.$f1},set:function(a){this.$f1=a}},"_$_bli!":{get:function(){return this.$f},set:function(a){this.$f=a}},_$_nqi:function(){},$Wf:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this.$CVz(),this):a.T.ZYA.INSTANCE},$kf:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this.$CVz(),this):a.DI.$f},$Ef:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this.$CVz(),this):a.FI.$f},$ug:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this.$CVz(),this):a.KI.$f},$Gg:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this):a.EI.$f},$Vf:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this.$CVz(),this):a.T.VIB.INSTANCE},$Ve:function(b,c){var d=c instanceof a.C.TTB?c:null;return null!==d?(this.$f1=d,this.$f=b,this):a.JQ.$f},$WY:function(b){return a.BQ.$m3(this.$f.$dT)},$Be:function(a,b){return this.$WY(a).$Pvy(b)},$ad:function(b,c){var d=this.$TX();if(null===d){return a.BQ.$m3(this.$f.$dT).$m3(b.$QV).$m1(c)}return d.$m4(c)||d.$m9(c,b.$QV)},$hd:function(a,b){return this.$WY(a).$Pvy(b)},$Qf:function(b,c){var d=this.$TX();if(null===d)return a.BQ.$m3(this.$f.$dT).$WPz(b,c);var e=d.$uRz(c,b,.5);return e<Number.POSITIVE_INFINITY?a.C.OZA.$o2(c,a.C.OZA.$o5(e,a.C.OZA.$o9(b,c))):null},$SY:function(b){var c=this.$TX();return null===c?a.BQ.$m3(this.$f.$dT).$m1(b):c.$m4(b)},$TX:function(){return null},_$_dpi:function(){return this.$f1.$f},_$_rwi:function(){return this.$f1.$f3},_$_xui:function(){return this.$f1.$f2},$yZ:function(c){var d=this.$SUz(),e=new a.T.UTB.T;e.$m2(a.BQ.$m3(this.$f.$dT)),f(this,e,d);var g=l(this,this.$f,c);e.$Ury(g);var i=new a.C.FYA,j=null!==d?a.BQ.$m3(d.$lT):a.T.QZA.EMPTY;if(i.$m2(j),e.$Ury(i),null!==d){var k=0;switch(this.$GYz()){case 0:var m;for(m=d.$eU.$KV.$fL();m.$TR();){var n=m.$PR;k=h(this,n,i,c,k)}var o;for(o=d.$yU.$TU.$fL();o.$TR();){var p=o.$PR;k=h(this,p,i,c,k)}break;case 1:var q;for(q=d.$yU.$TU.$fL();q.$TR();){var p=q.$PR;k=h(this,p,i,c,k)}var r;for(r=d.$eU.$KV.$fL();r.$TR();){var n=r.$PR;k=h(this,n,i,c,k)}}}return a.NI.$m2(c,i,b.lang.delegate(i.$m4,i)),a.NI.$m2(c,e,b.lang.delegate(e.$m4,e)),e},$mf:function(c,d){var e=this.$SUz(),f=d instanceof a.T.UTB.T?d:null;if(null===e||null===f)return a.NI.$m(c,d),this.$yZ(c);if(g(this,f,e))return a.NI.$m(c,d),this.$yZ(c);var h=f.$f6.$iL(0),j=m(this,this.$f,c,h);if(j!==h){var k=f.$f6.$WR(h);f.$f6.$mM(k,j),a.NI.$m(c,h)}var l=f.$f6.$iL(1),n=0;switch(this.$GYz()){case 0:var o;for(o=e.$eU.$KV.$fL();o.$TR();){var p=o.$PR;n=i(this,p,l,c,n)}var q;for(q=e.$yU.$TU.$fL();q.$TR();){var r=q.$PR;n=i(this,r,l,c,n)}break;case 1:var s;for(s=e.$yU.$TU.$fL();s.$TR();){var r=s.$PR;n=i(this,r,l,c,n)}var t;for(t=e.$eU.$KV.$fL();t.$TR();){var p=t.$PR;n=i(this,p,l,c,n)}}return f.$m2(a.BQ.$m3(this.$f.$dT)),a.NI.$m2(c,l,b.lang.delegate(l.$m4,l)),a.NI.$m2(c,f,b.lang.delegate(f.$m4,f)),f},$GY:function(b){if(b.isInstance(this))return this.$CVz(),this;if(b===a.C.TUB.$class)return this.$SUz();if(b===a.C.UVB.$class){var c=this.$SUz();if(null!==c)return new a.C.UVB(c,this.$GYz())}return b===a.C.UIB.$class?new a.T.UTB.T1:null},$static:{T:new b.lang.ClassDefinition(function(){return{$extends:a.C.FYA,$final:!0,constructor:function(){a.C.FYA.call(this)},$f8:0,"$p2!":{get:function(){return this.$f8},set:function(a){this.$f8=a}},$f9:null,"$p!":{get:function(){return this.$f9},set:function(a){this.$f9=a}},$f10:null,"$p1!":{get:function(){return this.$f10},set:function(a){this.$f10=a}},$f11:0,"$p3!":{get:function(){return this.$f11},set:function(a){this.$f11=a}},"equals!":function(b){var c=b instanceof a.T.UTB.T?b:null;return null!==c&&(this.$f11===c.$f11&&this.$f8===c.$f8&&(null===c.$f9&&null===this.$f9||null!==this.$f9&&this.$f9.equals(c.$f9))&&(null===c.$f10&&null===this.$f10||null!==c.$f10&&c.$f10.equals(this.$f10)))}}}),T1:new b.lang.ClassDefinition(function(){return{$final:!0,$with:[a.C.UIB],"$ZY!":function(b){var c=a.YP.$m4(a.C.TUB.$class,b);if(null!==c){var d=c.$yU.$TU,e=c.$eU.$KV;if(d.$fL().$TR()&&e.$fL().$TR()){var f=a.BX.$m2(c),g=d,h=a.JE.$m15(g),i=a.JE.$m(g),j=h.$hT.$f;for(g=h.$TU;null!==(h=a.JE.$m27(g));)j+=h.$hT.$f,g=h.$TU;var k=i.$hT.$f3;for(g=i.$TU;null!==(i=a.JE.$m6(g));)k+=i.$hT.$f3,g=i.$TU;var l=e,m=a.JE.$m15(l),n=a.JE.$m(l),o=m.$hT.$f1;for(l=m.$KV;null!==(m=a.JE.$m27(l));)o+=m.$hT.$f1,l=m.$KV;var p=n.$hT.$f2;for(l=n.$KV;null!==(n=a.JE.$m6(l));)p+=n.$hT.$f2,l=n.$KV;return f.$bwy(new a.C.PZA.$p(o,j,p,k))}}return a.T.PZA.EMPTY}}})}}})}),b.lang.module("yfiles._R",function(c){c.TV=new b.lang.ClassDefinition(function(){return{$extends:a.EW,$final:!0,constructor:function(){a.EW.call(this)},"$m13!":function(a,b,c){this.$f17=null!==a?a.$ZM:null,this.$dS=b,this.$m8(a,b,c.$f2),this.$m9(b),this.$m11(c,b)},"$m12!":function(a,b,c){this.$m8(a,b,c.$f2),this.$m9(b),this.$m11(c,b)},"$m11!":function(a,b){this.$p=b.$QS},$f3:null,"$p!":{get:function(){return this.$f3},set:function(b){this.$f3!==b&&(this.$f3=b,this.$m10(a.TV.$f))}},"$m9!":function(b){this.$p2=a.BQ.$m3(b.$jT),this.$p6=new a.C.CAB.$n(1,0,0,1,b.$jT.$ES,b.$jT.$FS)},$static:{$f:null,$clinit:function(){a.TV.$f=new a.C.GTA(n[1])}}}})}),b.lang.module("yfiles._R",function(c){c.UV=new b.lang.ClassDefinition(function(){return{$final:!0,$static:{$f:!1,"$m!":function(){a.UV.$f||(a.UV.$f=!0,a.TL.$f1.$f94=function(b){return null===b?new a.C.SVB(null):new a.C.SVB(b)})}}}})}),function(){a.UV.$m()}()}(b.lang.module("yfiles._R"),b),b})}("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this);
