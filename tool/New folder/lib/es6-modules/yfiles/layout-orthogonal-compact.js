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

/* eslint-disable */
import y from'./core.js';import l from'./lang.js';import'./algorithms.js';import'./layout-orthogonal.js';import'./router-polyline.js';import'./router-other.js';import'./layout-tree.js';import'./layout-core.js';(function(a,b,c,d){'use strict';b.lang.addMappings('yFiles-for-HTML-Complete-2.1.0.6-Evaluation (Build 4f35f10f095a-12/08/2018)',{_$_sqd:['aspectRatio','$PF'],_$_tqd:['gridSpacing','$QF'],_$_oyl:['CompactOrthogonalLayout','WFC'],_$$_boa:['yfiles.orthogonal','yfiles._R.T','yfiles._R.C']});var e=['Illegal value for grid size: ','Aspect ratio must be greater than zero: '];b.lang.module('_$$_boa',function(c){c._$_oyl=new b.lang.ClassDefinition(function(){return{$extends:a.C.YFC,constructor:function(){a.C.YFC.call(this);var b=new a.T.YFC.T2(0,a.WE.$f4);this.$lQy=b;var c=new a.C.VFC;c.$Efy=!0,c.$mB=3,this.$jU=c;var d=new a.T.YFC.T1(null);this.$mRy=d,this.$kQy=a.ANA.$m(null),this.$PF=1,this.$QF=20},$f:0,$f1:0,$f5:0,$f6:0,_$_tqd:{get:function(){return this.$f1},set:function(b){if(b<1)throw a.PE.$m18(e[0]+b);if(this.$f1=b,this.$jU instanceof a.C.VFC){this.$jU.$RF=b}if(this.$mRy instanceof a.T.YFC.T1){var c=this.$mRy;c.$f.$VSy=2*b,c.$f.$FF=b}var d=this.$kQy;if(d instanceof a.T.YFC.T){d.$f.$Nn=new a.C.NGC(0,0,b)}else d instanceof a.BNA&&(d.$f=0.125)}},_$_sqd:{get:function(){return this.$f},set:function(b){if(b<=0)throw a.PE.$m18(e[1]+b);if(this.$f=b,this.$mRy instanceof a.T.YFC.T1){this.$mRy.$f.$FKy=new a.C.FRA(b,1)}this.$kQy instanceof a.BNA&&(this.$kQy.$f=0.125)}}}})})}(y.lang.module('yfiles._R'),y));export var CompactOrthogonalLayout=y.orthogonal.CompactOrthogonalLayout;export default y;
