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
import y from'./core.js';import l from'./lang.js';import'./algorithms.js';import'./layout-core.js';import'./layout-hierarchic.js';import'./router-other.js';(function(a,b,c,d){'use strict';function e(b){var c=new a.C.GDC,d=c.$Oby;d.$IH=new a.C.DEC(0),d.$Ziy=60,d.$Why=20;var e=c.$Uby;switch(b.$f7){case-1:e.$PNy=0;break;case 0:e.$PNy=0.5;break;case 1:e.$PNy=1}return c}function f(a,b,c){for(var d=0,e=0,f=b.$Vmy();f.$IS;f.$mX()){var g=f.$US;1===c.$xY(g)?g.$f7>0&&e++:d+=g.$f6}return e<=1&&2===d}function g(b,c,d,e){for(var g=d.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY),h=b.$f.$f11.$Vmy();h.$IS;h.$mX()){var i=h.$US,j=c.$nxy(i);if(f(b,j,g)){e.$zN(i,!0);for(var k=j.$Vmy();k.$IS;k.$mX()){var l=k.$US;if(1!==g.$xY(l))for(var m=l.$BAy(null);m.$IS;m.$mX())b.$f.$f4.$Wd(m.$TS,null)}}}}function h(b,c,d,e,f){for(var g=c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY),h=b.$f.$f11.$Vmy();h.$IS;h.$mX()){var i=h.$US;if(e.$rN(i)){for(var j=d.$nxy(i),k=null,l=null,m=j.$Vmy();m.$IS;m.$mX()){var n=m.$US;1!==g.$xY(n)&&n.$f6>0&&(null===k?k=n:l=n)}if(null!==k&&null!==l){var o=c.$Wvy(k),p=c.$Wvy(l),q=f.$m(k.$f11).$f,r=f.$m(l.$f11).$f;if(o>p&&q<r||o<p&&q>r)for(var s=c.$rAy(i),m=j.$Vmy();m.$IS;m.$mX()){var n=m.$US,t=s.$f+s.$f3-(c.$Wvy(n)-s.$f);c.$RQz(n,t,c.$Xvy(n))}}}}}function i(b,c,d,e){for(var f=c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY),g=b.$f.$f11.$Vmy();g.$IS;g.$mX()){var h=g.$US;if(e.$rN(h))for(var i=d.$nxy(h),j=i.$Vmy();j.$IS;j.$mX()){var k=j.$US;if(1!==f.$xY(k))for(var l=k.$BAy(null);l.$IS;l.$mX()){var m=l.$TS;c.$EPz(m,new a.C.HRA.$n(0,-c.$m38(k).$qU/2)),b.$f.$f4.$Wd(m,a.T.HAC.$n(1,!0))}}}}function j(b,c){b.$f20=a.T.VSA.$z();var d=c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY);if(null!==d)for(var e=c.$Xpy();e.$IS;e.$mX()){var f=e.$US;1===d.$xY(f)&&b.$f20.$cd(f,f.$f7)}}function k(b,c){b.$f21=a.T.VSA.$z();var d=c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY);if(null!==d)for(var e=c.$Xpy();e.$IS;e.$mX()){var f=e.$US;1===d.$xY(f)&&b.$f21.$cd(f,f.$f6)}}function l(b,c,d){var e=c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY);b.$f16=c.$Upy(),b.$f17=c.$Upy(),b.$f3=c.$Upy(),b.$f4=c.$Upy(),b.$f12 instanceof a.C.GDC&&0!==b.$f19&&(b.$f=b.$f12.$wLz(c)),m(b,c,d);for(var f=c.$yAy(a.T.KYB.NODE_ID_DP_KEY),g=c.$Xpy();g.$IS;g.$mX()){var h=g.$US;if(1===c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(h)){for(var i=null,j=h.$nCy(null);j.$IS;j.$mX()){var k=j.$TS.$f3;if(null===i&&(i=k),c.$CPz(j.$TS,new a.C.HRA.$n(0,c.$m38(j.$TS.$f2).$qU/2)),c.$EPz(j.$TS,new a.C.HRA.$n(0,-c.$m38(j.$TS.$f3).$qU/2)),b.$f3.$Wd(j.$TS,a.T.HAC.$n(2,!0)),b.$f4.$Wd(j.$TS,a.T.HAC.$n(1,!0)),null!==b.$f&&i!==k){var l=null===f?i:f.$xY(i),n=null===f?k:f.$xY(k);(4===b.$f19||3===b.$f19)!==(2===e.$xY(k))?b.$f.$Qg(l,n):b.$f.$Sg(l,n)}}for(var o=new a.FD,p='CG'+h.$Ho,q=h.$nCy(null);q.$IS;q.$mX()){var r=q.$TS;b.$f16.$Wd(r,p);var s=b.$f15.$xY(r.$f3);null!==s&&-1!==o.$WR(s)||(b.$f17.$Wd(r,p),null!==s&&o.$m(s))}}}c.$EOz(a.T.JAC.SOURCE_GROUP_ID_DP_KEY,b.$f16),c.$EOz(a.T.JAC.TARGET_GROUP_ID_DP_KEY,b.$f17),c.$EOz(a.T.JAC.SOURCE_PORT_CONSTRAINT_DP_KEY,b.$f3),c.$EOz(a.T.JAC.TARGET_PORT_CONSTRAINT_DP_KEY,b.$f4)}function m(b,c,d){b.$f5=a.CE.$m13(c.$gy),b.$f1=new a.FD;var e=new a.FD;b.$f11=new a.C.FSA.$m,b.$f2=c.$Vpy(),b.$f15=c.$Vpy(),b.$f6=c.$Vpy(),b.$f9=c.$Vpy(),b.$f8=c.$Vpy();for(var f=c.$Xpy();f.$IS;f.$mX()){var g=new a.C.FSA.$m,h=f.$US;b.$f2.$Wd(h,'n'+h.$Ho),1===c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(h)?n(b,h,g):o(b,h,g);var i=new a.FD;i.$m(g),p(b,g,i);for(var j=0;j<i.$eL;j++)if(g=i.$iL(j),g.$f1>1){for(var k=new a.KF.$c1('GN'),l=0;l<g.$f1;l++)k.$m2(a.DE.$m8(g.$iL(l).$Ho)),k.$m2('/');e.$m(k.toString()),b.$f1.$m(g)}}for(var m=0;m<b.$f1.$eL;m++){var q=new a.C.YQA(0,0,0,0),r=c.$Soy(),g=b.$f1.$iL(m);b.$f11.$m3(r);for(var s=0;s<g.$f1;s++){var t=g.$iL(s);b.$f15.$Wd(t,e.$iL(m)),b.$f9.$Wd(t,d),b.$f8.$Wd(t,q)}b.$f8.$Wd(r,q),b.$f6.$zN(r,!0),b.$f2.$Wd(r,e.$iL(m))}c.$EOz(a.T.RXB.NODE_ID_DP_KEY,b.$f2),c.$EOz(a.T.RXB.PARENT_NODE_ID_DP_KEY,b.$f15),c.$EOz(a.T.RXB.GROUP_DP_KEY,b.$f6),c.$EOz(a.T.RXB.GROUP_NODE_INSETS_DP_KEY,b.$f8),c.$EOz(a.T.DZB.LAYOUT_DP_KEY,b.$f9)}function n(b,c,d){if(1!==c.$f2.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(c))throw a.PE.$m30(w[4]);if(!b.$f5[c.$Ho]){d.$m3(c),b.$f5[c.$Ho]=!0;for(var e=0,f=c.$ory();f.$IS;f.$mX())if(o(b,f.$US,d),++e>2)throw a.PE.$m30(w[5])}}function o(b,c,d){if(1===c.$f2.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(c))throw a.PE.$m30(w[6]);if(!b.$f5[c.$Ho]){d.$m3(c),b.$f5[c.$Ho]=!0;for(var e=c.$gqy();e.$IS;e.$mX())n(b,e.$US,d)}}function p(b,c,d){var e=-1,f=-1;for(e=0;e<c.$f1;e++){var g=c.$iL(e);if(1===g.$f2.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(g)){for(var h=g.$gqy();h.$IS&&!((f=c.$WR(h.$US))>-1);h.$mX());if(f>-1)break}}if(-1!==f){var i=new a.C.FSA.$m,j=c.$iL(e),k=c.$iL(f),l=new a.C.FSA.$m;c.$VR(k),i.$m3(k);for(var h=k.$gqy();h.$IS;h.$mX()){var m=h.$US;c.$VR(m),i.$m3(m);for(var n=m.$ory();n.$IS;n.$mX()){var o=n.$US;o!==k&&(q(b,m,o,j,k)?s(b,m,c,i):l.$m3(m))}}for(var h=l.$Vmy();h.$IS;h.$mX())for(var r=h.$US,t=r.$BAy(null);t.$IS;t.$mX())if(t.$TS.$f2!==k){var u=k.$f2;u.$CPz(t.$TS,new a.C.HRA.$n(0,0)),u.$EPz(t.$TS,new a.C.HRA.$n(0,0)),b.$f3.$Wd(t.$TS,a.T.HAC.$n(0,!0)),b.$f4.$Wd(t.$TS,a.T.HAC.$n(0,!0))}p(b,c,d),p(b,i,d),d.$m(i)}}function q(b,c,d,e,f){return r(b,c,d,e,f,new a.MD)}function r(b,c,d,e,f,g){if(!a.KD.$m9(g,new a.T.BCC.T(c,d)))return!0;for(var h=d.$gqy();h.$IS;h.$mX()){var i=h.$US;if(i!==c){if(i===e)return!1;for(var j=i.$ory();j.$IS;j.$mX()){var k=j.$US;if(k!==d){if(k===f)return!0;if(!r(b,i,k,e,f,g))return!1}}}}return!0}function s(a,b,c,d){for(var e=b.$ory();e.$IS;e.$mX()){var f=e.$US;if(!(c.$WR(f)<0)){c.$VR(f),d.$m3(f);for(var g=f.$gqy();g.$IS;g.$mX()){var h=g.$US;c.$WR(h)>-1&&(c.$VR(h),d.$m3(h),s(a,h,c,d))}}}}function t(b,c){null!==b.$f16&&(c.$wEy(a.T.JAC.SOURCE_GROUP_ID_DP_KEY),c.$zzy(b.$f16),b.$f16=null),null!==b.$f17&&(c.$wEy(a.T.JAC.TARGET_GROUP_ID_DP_KEY),c.$zzy(b.$f17),b.$f17=null),null!==b.$f3&&(c.$wEy(a.T.JAC.SOURCE_PORT_CONSTRAINT_DP_KEY),c.$zzy(b.$f3),b.$f3=null),null!==b.$f4&&(c.$wEy(a.T.JAC.TARGET_PORT_CONSTRAINT_DP_KEY),c.$zzy(b.$f4),b.$f4=null),null!==b.$f8&&(c.$wEy(a.T.RXB.GROUP_NODE_INSETS_DP_KEY),c.$Azy(b.$f8),b.$f8=null),null!==b.$f9&&(c.$wEy(a.T.DZB.LAYOUT_DP_KEY),c.$Azy(b.$f9),b.$f9=null),null!==b.$f2&&(c.$wEy(a.T.RXB.NODE_ID_DP_KEY),c.$Azy(b.$f2),b.$f2=null),null!==b.$f15&&(c.$wEy(a.T.RXB.PARENT_NODE_ID_DP_KEY),c.$Azy(b.$f15),b.$f15=null),null!==b.$f6&&(c.$wEy(a.T.RXB.GROUP_DP_KEY),c.$Azy(b.$f6),b.$f6=null),null!==b.$f&&(b.$f.$KX(),b.$f=null)}function u(b,c,d,e,f){for(var g=new a.C.FSA.$m,h=f.$gqy();h.$IS;h.$mX()){var i=h.$US;if(d.$VR(i)){var j=v(b,i,f,new a.C.FSA.$o(f));b.$f3.$cd(i,j),g.$m3(i)}}g.$psy(b.$f2);var k=f.$f2.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY),l=!1;if(1===g.$f1&&e.$WR(f)===e.$f1-1&&(l=!0),2===b.$f.$f19||4===b.$f.$f19)for(var m=0;m<g.$f1;m++)4===b.$f.$f19===(2===k.$xY(f))?e.$m3(g.$iL(m)):e.$aR(0,g.$iL(m));else if(0!==b.$f.$f19&&1===e.$f1&&1===g.$f1)3===b.$f.$f19===(2===k.$xY(f))?e.$m3(g.$iL(0)):e.$aR(0,g.$iL(0));else for(var n=e.$WR(f),o=e.$WR(f)+1,m=0;m<g.$f1;m++)m%2!==0||l?e.$aR(o,g.$iL(m)):e.$aR(n,g.$iL(m)),o++;for(var p=new a.C.FSA.$m,m=0;m<g.$f1;m++){for(var q=!1,i=g.$iL(m),r=null,s=i.$ory();s.$IS;s.$mX())if((r=s.$US)!==f){q=!0;break}if(c.$VR(r)){p.$m3(r);var t=e.$WR(i);e.$WR(f)>t?e.$aR(e.$WR(i),r):e.$aR(e.$WR(i)+1,r)}else if(q){var w=0;e.$VR(i);for(var s=i.$ory();s.$IS;s.$mX())w=Math.max(e.$WR(s.$US),w);e.$aR(w,i)}}g=null;for(var m=0;m<p.$f1;m++)u(b,c,d,e,p.$iL(m))}function v(a,b,c,d){for(var e=1,f=b.$ory();f.$IS;f.$mX()){var g=f.$US;if(g!==c&&-1===d.$WR(g)){d.$m3(g);for(var h=g.$gqy();h.$IS;h.$mX()){var i=h.$US;i!==b&&(e+=v(a,i,g,d))}}}return e}b.lang.addMappings('yFiles-for-HTML-Complete-2.1.0.6-Evaluation (Build 4f35f10f095a-12/08/2018)',{get _$_sid(){return['alignment','$XA',b.lang.decorators.Type('yfiles._R.C.DCC',4)]},_$_tid:['topLayout','$YA'],_$_poe:['partnerlessBelow','$YSy'],_$_dff:['offsetForFamilyNodes','$Gby'],_$_ylf:['familyNodesAlwaysBelow','$gey'],get _$_avf(){return['familyMembersSortingPolicy','$Njy',b.lang.decorators.Type('yfiles._R.C.ECC',4)]},_$_vvf:['spacingBetweenFamilyMembers','$jjy'],_$_tul:['FamilyTreeLayout','BCC'],_$_uul:['FamilyType','CCC'],_$_vul:['VerticalNodeAlignment','DCC'],_$_wul:['FamilyMembersSortingPolicy','ECC'],_$$_una:['yfiles.genealogy','yfiles._R.T','yfiles._R.C']});var w=['Unknown alignment.','DataProvider ',' is not registered to the graph.','FamilyTypeDpKey','Direct link between two individuals','Family node has more than two parent nodes','Direct link between two family nodes'];b.lang.module('_$$_una',function(c){c._$_tul=new b.lang.ClassDefinition(function(){return{$extends:a.C.GZB,constructor:function(){a.C.GZB.call(this),this.$$init$$1(),this.$f=null,this.$yfy=!1,this.$tVy.$JD=12,this.$f12=e(this)},$f16:null,$f17:null,$f3:null,$f4:null,$f9:null,$f2:null,$f15:null,$f6:null,$f8:null,$f20:null,$f21:null,$f12:null,$f22:!0,$f13:30,$f14:10,$f10:!0,$f18:!1,$f7:null,_$_tid:{get:function(){return this.$f12},set:function(a){this.$f12=null===a?e(this):a}},'$m1!':function(){if(!this.$f22||0!==this.$f19)return!1;var b=this.$YA;return a.C.LYB.isInstance(b)&&(b=b.$jU),b instanceof a.C.GDC},_$_vvf:{get:function(){return this.$f13},set:function(b){if(b<0)throw a.PE.$m2();this.$f13=b}},_$_dff:{get:function(){return this.$f14},set:function(b){if(b<0)throw a.PE.$m2();this.$f14=b}},_$_poe:{get:function(){return this.$f10},set:function(a){this.$f10=a}},_$_ylf:{get:function(){return this.$f18},set:function(a){this.$f18=a}},_$_sid:{get:function(){return this.$f7},set:function(b){var c=0;switch(0|b){case 1:c=1;break;case 0:c=0.5;break;case-1:c=0;break;default:throw a.PE.$m18(w[0])}null!==this.$f12&&this.$f12 instanceof a.C.GDC&&(this.$f12.$Uby.$PNy=c),this.$f7=0|b}},$hiy:{set:function(a){this.$f47=a}},$Gdy:{set:function(a){this.$f31=a}},$f19:0,$f:null,_$_avf:{get:function(){return this.$f19},set:function(b){switch(0|b){case 0:case 1:case 2:case 3:case 4:this.$f19=0|b;break;default:throw a.PE.$m2()}}},$hBy:function(c){if(null===c.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY))throw a.PE.$m28(w[1]+a.T.BCC.FAMILY_TYPE_DP_KEY+w[2]);var d=new a.C.USA(c),e=c.$yAy(a.T.RXB.GROUP_DP_KEY),f=c.$yAy(a.T.RXB.PARENT_NODE_ID_DP_KEY),g=c.$yAy(a.T.RXB.NODE_ID_DP_KEY),h=c.$yAy(a.T.RXB.GROUP_NODE_INSETS_DP_KEY),i=new a.C.USA(c),m=null,n=a.T.VSA.$z(),o=a.T.VSA.$z(),p=a.T.VSA.$z(),q=a.T.VSA.$z(),r=a.T.VSA.$x(),s=null;if(j(this,c),k(this,c),null!==e){m=c.$Upy();for(var u=!1,v=c.$Wpy();v.$IS;v.$mX()){var x=v.$TS;e.$rN(x.$f2)!==e.$rN(x.$f3)?(m.$zN(x,!0),i.$kry(x),u=!0):m.$zN(x,!1)}u||(c.$zzy(m),m=null);for(var y=c.$Xpy();y.$IS;y.$mX()){var z=y.$US;e.$rN(z)&&(r.$Wd(g.$xY(z),z),d.$msy(z),n.$zN(z,!0),o.$Wd(z,f.$xY(z)),p.$Wd(z,g.$xY(z)),q.$Wd(z,h.$xY(z)))}null!==e&&c.$wEy(a.T.RXB.GROUP_DP_KEY),null!==f&&c.$wEy(a.T.RXB.PARENT_NODE_ID_DP_KEY),null!==g&&c.$wEy(a.T.RXB.NODE_ID_DP_KEY),null!==h&&c.$wEy(a.T.RXB.GROUP_NODE_INSETS_DP_KEY)}var A=new a.T.BCC.T1(this);if(l(this,c,A),null!==e){for(var B=new a.C.SXB(c),y=c.$Xpy();y.$IS;y.$mX()){var z=y.$US;if(B.$pxy(z)){var C=new a.FD;n.$zN(z,!1);for(var D=B.$nxy(z).$m1();D.$p;){var E=D.$m(),F=f.$xY(E);if(null!==F){for(var G=0;G<C.$eL;G++)if(F===f.$xY(C.$iL(G))){F=null;break}null!==F&&C.$m(E)}}if(0===C.$eL){var E=B.$nxy(z).$xoy();o.$Wd(z,f.$xY(E)),p.$Wd(z,g.$xY(E))}else if(o.$Wd(z,f.$xY(C.$iL(0))),p.$Wd(z,g.$xY(C.$iL(0))),C.$eL>1){for(var H=0;H<C.$eL;H++)for(var I=r.$xY(f.$xY(C.$iL(H))),J=0;J<C.$eL;J++){var K=r.$xY(f.$xY(C.$iL(J)));b.lang.Object.equals(g.$xY(K),f.$xY(I))&&C.$m2(J)}if(o.$Wd(z,f.$xY(C.$iL(0))),p.$Wd(z,g.$xY(C.$iL(0))),1===C.$eL);else{null===s&&(s=new a.C.FSA.$m);var L=c.$Soy();s.$m3(L),n.$zN(L,!0),p.$Wd(L,L);for(var G=1;G<C.$eL;G++)for(var M=C.$iL(0),N=!1;null!==M;){for(var O=r.$xY(f.$xY(M)),P=C.$iL(G);null!==P;){var Q=r.$xY(f.$xY(P));if(Q===O){if(C.$iL(0)!==M)for(var R=0;R<G;R++)C.$mM(R,M);C.$mM(G,P),N=!0;break}P=Q}if(N)break;for(var R=0;R<G;R++)C.$mM(R,M);M=O}for(var G=0;G<C.$eL;G++)o.$Wd(C.$iL(G),L);o.$Wd(L,f.$xY(C.$iL(0))),d.$msy(L)}}}else n.$zN(z,!1),o.$Wd(z,f.$xY(z)),p.$Wd(z,g.$xY(z))}B.$gny()}var S=new a.T.BCC.T2(this,this.$YA),T=new a.T.BCC.T4(d,e,n,o,p,q,S),U=new a.C.DZB;U.$jU=T;var V=new a.C.YXB.$n(U);V.$LNy=this.$m1();try{new a.T.BCC.T3(this,V,A,S).$uZ(c)}finally{t(this,c),null!==e&&c.$EOz(a.T.RXB.GROUP_DP_KEY,e),null!==f&&c.$EOz(a.T.RXB.PARENT_NODE_ID_DP_KEY,f),null!==g&&c.$EOz(a.T.RXB.NODE_ID_DP_KEY,g),null!==h&&c.$EOz(a.T.RXB.GROUP_NODE_INSETS_DP_KEY,h)}if(d.$Boy(),null!==s){for(var G=0;G<s.$f1;G++)c.$zvy(s.$iL(G));s=null}if(i.$Boy(),null!==this.$f1)for(var G=0;G<this.$f1.$eL;G++)c.$zvy(this.$f11.$iL(G));if(null!==m){c.$EOz(a.T.THC.AFFECTED_EDGES_DP_KEY,m);var W=new a.C.VHC;W.$ZXy=a.T.THC.AFFECTED_EDGES_DP_KEY;try{W.$uZ(c)}finally{c.$wEy(a.T.THC.AFFECTED_EDGES_DP_KEY),c.$zzy(m)}}},$f5:null,$f1:null,$f11:null,$$init$$1:function(){this.$f7=0},$static:{FAMILY_TYPE_DP_KEY:null,T2:new b.lang.ClassDefinition(function(){return{$extends:a.C.EZB,$final:!0,constructor:function(b,c){a.C.EZB.call(this,c),this.$f=b,this.$f1=a.T.VSA.$y()},$f1:null,'$m!':function(a){return this.$f1.$xY(a)},'$uZ!':function(a){if(this.$jU.$uZ(a),this.$f.$m1())for(var b=a.$Xpy();b.$IS;b.$mX())for(var c=b.$US,d=c.$BAy(null);d.$IS;d.$mX()){var e=d.$TS;this.$f1.$Wd(e,a.$rEy(e))}},$f:null}}),T3:new b.lang.ClassDefinition(function(){return{$extends:a.C.EZB,$final:!0,constructor:function(b,c,d,e){a.C.EZB.call(this,c),this.$f=b,this.$f2=d,this.$f1=e},$f2:null,$f1:null,'$uZ!':function(b){if(this.$f.$m1()){var c=new a.C.SXB(b),d=a.T.VSA.$z();g(this,c,b,d),this.$jU.$uZ(b),h(this,b,c,d,this.$f1),i(this,b,c,d),b.$EOz(a.T.RXB.GROUP_NODE_INSETS_DP_KEY,this.$f.$f8);var e=this.$f1.$jU;e.$zD=0,this.$f2.$f1=!0,this.$jU.$uZ(b),e.$zD=1,this.$f2.$f1=!1,b.$wEy(a.T.GDC.INCREMENTAL_HINTS_DP_KEY),c.$gny()}else this.$jU.$uZ(b)},$f:null}}),T4:new b.lang.ClassDefinition(function(){return{$extends:a.C.EZB,$final:!0,constructor:function(b,c,d,e,f,g,h){a.C.EZB.call(this,h),this.$f=b,this.$f1=c,this.$f2=d,this.$f5=e,this.$f4=f,this.$f3=g},'$uZ!':function(b){var c=new a.C.FSA.$n(this.$f.$lqy());this.$f.$Boy(),null!==this.$f1&&(b.$EOz(a.T.RXB.GROUP_DP_KEY,this.$f2),b.$EOz(a.T.RXB.PARENT_NODE_ID_DP_KEY,this.$f5),b.$EOz(a.T.RXB.NODE_ID_DP_KEY,this.$f4),b.$EOz(a.T.RXB.GROUP_NODE_INSETS_DP_KEY,this.$f3)),this.$xfz(b),this.$f.$nsy(c),b.$wEy(a.T.RXB.GROUP_DP_KEY),b.$wEy(a.T.RXB.PARENT_NODE_ID_DP_KEY),b.$wEy(a.T.RXB.NODE_ID_DP_KEY),b.$wEy(a.T.RXB.GROUP_NODE_INSETS_DP_KEY)},$f:null,$f1:null,$f2:null,$f5:null,$f4:null,$f3:null}}),T:new b.lang.ClassDefinition(function(){return{$final:!0,constructor:function(a,b){this.$f1=a,this.$f=b},$f1:null,$f:null,'equals!':function(a){if(this===a)return!0;if(null===a||b.lang.getType(this)!==b.lang.getType(a))return!1;var c=a;return this.$f===c.$f&&this.$f1===c.$f1},'hashCode!':function(){var a=this.$f1.hashCode();return a=31*a+this.$f.hashCode()}}}),T1:new b.lang.ClassDefinition(function(){return{$final:!0,$with:[a.C.JYB],constructor:function(b){this.$f=b,this.$f1=!1,this.$f3=a.T.VSA.$z(),this.$f2=new a.T.BCC.T1.T(this,this.$f3,this.$f.$f20)},$f1:!1,$f2:null,$f3:null,'$p!':{get:function(){return this.$f1},set:function(a){this.$f1=a}},'$uZ!':function(b){if(1!==b.$gy){if(2===b.$gy&&this.$f.$f10&&this.$f.$f21.$DY(b.$fy)<2&&this.$f.$f21.$DY(b.$Nw)<2){for(var c=null,d=null,e=b.$Xpy();e.$IS;e.$mX()){var f=e.$US;1!==b.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(f)?c=f:d=f}if(null!==c&&null!==d){var g=b.$m38(c),h=b.$m38(d);g.$je(-g.$VT/2,0),h.$je(-h.$VT/2,g.$qU+this.$f.$f14);for(var i=d.$BAy(null);i.$IS;i.$mX()){var j=i.$TS,k=b.$m37(j);k.$YX(),k.$CV=new a.C.HRA.$n(0,0),k.$DV=new a.C.HRA.$n(0,0)}var l=this.$f.$f8.$xY(c),m=new a.C.YQA(l.top,l.left,-this.$f.$f14-b.$m38(d).$qU,l.right);return void this.$f.$f8.$Wd(c,m)}}var n=new a.C.FSA.$m;if(this.$f1)n.$Hsy(b.$Xpy()),n.$psy(new a.T.BCC.T1.T1(this,b));else{for(var o=new a.C.FSA.$m,p=new a.C.FSA.$m,e=b.$Xpy();e.$IS;e.$mX()){var f=e.$US;1!==b.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(f)?o.$m3(f):p.$m3(f)}for(var q=null,r=0,s=0;s<o.$f1;s++){var t=o.$iL(s);t.$gqy().$SS>r&&(r=t.$gqy().$SS,q=t)}o.$VR(q),n.$m3(q),u(this,o,p,n,q)}for(var v=new a.C.FSA.$m,w=new a.C.FSA.$m,x=new a.FD,y=0,z=0,A=Number.MAX_VALUE,s=0;s<n.$f1;s++){var f=n.$iL(s),B=b.$m38(f);1===b.$yAy(a.T.BCC.FAMILY_TYPE_DP_KEY).$xY(f)?(v.$m3(f),x.$m(s),B.$je(y+Math.max((this.$f.$f13-B.$VT)/2,B.$VT/4),-B.$qU/2),y=y+Math.max(1.5*B.$VT,this.$f.$f13)|0):(w.$m3(f),A=Math.min(B.$qU,A),z=Math.max(B.$qU,z),B.$je(y,-B.$qU/2),y=y+B.$VT|0)}if(0!==this.$f.$f7)for(var s=0;s<w.$f1;s++){var B=b.$m38(w.$iL(s));1===this.$f.$f7?B.$je(B.$GS,-(B.$qU-A/2)):B.$je(B.$GS,-A/2)}for(var C=a.CE.$m10(n.$f1),D=-2,s=0;s<v.$f1;s++){var E=v.$iL(s),F=!1,G=a.VD.$m8(x.$iL(s));if(this.$f.$f18||D===G-1&&0===C[D])F=!0;else for(var H=E.$ory();H.$IS;H.$mX()){var I=H.$US,J=n.$WR(I)-G;if(Math.abs(J)>2){F=!0;break}}if(F)C[G]=1;else{for(var K=new a.C.HRA.$n(0,0),i=E.$BAy(null);i.$IS;i.$mX()){var j=i.$TS,k=b.$m37(j);if(k.$YX(),0===this.$f.$f7)k.$CV=K;else{var B=b.$m38(j.$f2);b.$BPz(j,new a.C.HRA.$n(B.$GS+B.$VT/2,0))}k.$DV=K}v.$m5(s),x.$m2(s),s--}D=G}var L,M=z/2;1===this.$f.$f7?M=A/2:-1===this.$f.$f7&&(M=z-A/2),L=M;for(var s=0;s<v.$f1;s++){for(var E=v.$iL(s),N=a.VD.$m8(x.$iL(s)),O=0,P=E.$ory();P.$IS;P.$mX()){for(var Q=n.$WR(P.$US),R=Math.min(N,Q),S=Math.max(N,Q),T=0,U=R;U<=S;U++)T+=C[U];O=Math.max(T,O)}var B=b.$m38(E),V=M+this.$f.$f14+(B.$qU+this.$f.$f14)*(O-1);B.$je(B.$GS,V),L=Math.max(L,V+B.$qU)}for(var W=0;W<w.$f1;W++){for(var t=w.$iL(W),X=n.$WR(t),Y=0,Z=new a.C.MQA.$m,i=t.$nCy(null);i.$IS;i.$mX()){var j=i.$TS;C[n.$WR(j.$f3)]>0&&(Z.$m3(j),Y++)}if(Y>0){for(var $=b.$m38(t),_=$.$VT/(Y+1),aa=a.CE.$m10(Z.$f1),ba=a.CE.$m10(Z.$f1),s=0;s<Z.$f1;s++){aa[s]=n.$WR(Z.$iL(s).$f3)-X,aa[s]>0&&(aa[s]-=2*n.$f1),ba[s]=_;for(var U=0;U<s;U++)aa[s]>aa[U]?ba[U]+=_:ba[s]+=_}for(var s=0;s<Z.$f1;s++){var j=Z.$iL(s),k=b.$m37(j);k.$YX(),k.$DV=new a.C.HRA.$n(0,0);var ca=ba[s],da=b.$m38(j.$f3),ea=da.$HS+da.$qU/2,fa=b.$m38(t);k.$CV=new a.C.HRA.$n(ca-fa.$VT/2,0),k.$ye(fa.$GS+ca,ea)}}}var l=this.$f.$f8.$xY(w.$iL(0)),ga=l.top,ha=l.bottom;null!==l&&0===this.$f.$f7?ga=L-M:null!==l&&1===this.$f.$f7&&(ha=M-L),this.$f.$f8.$Wd(w.$iL(0),new a.C.YQA(ga,l.left,ha,l.right))}},$f:null,$static:{T:new b.lang.ClassDefinition(function(){return{$final:!0,$with:[a.C.JTA],constructor:function(a,b,c){this.$f1=a,this.$f=b,this.$f2=c},$f:null,$f2:null,'$bR!':function(b,c){var d=a.T.PSA.$m(this.$f.$DY(b),this.$f.$DY(c));return 0!==d?d:a.T.PSA.$m(this.$f2.$DY(b),this.$f2.$DY(c))},$f1:null}}),T1:new b.lang.ClassDefinition(function(){return{$final:!0,$with:[a.C.JTA],constructor:function(a,b){this.$f1=a,this.$f=b},$f:null,'$bR!':function(b,c){return a.T.PSA.$v(this.$f.$Wvy(b),this.$f.$Wvy(c))},$f1:null}})}}}),$clinit:function(){a.T.BCC.FAMILY_TYPE_DP_KEY=new a.C.KQA(a.C.CCC.$class,a.C.BCC.$class,w[3])}}}})}),b.lang.module('_$$_una',function(a){a._$_uul=new b.lang.EnumDefinition(function(){return{FAMILY:1,MALE:2,FEMALE:3}})}),b.lang.module('_$$_una',function(a){a._$_vul=new b.lang.EnumDefinition(function(){return{TOP:-1,CENTER:0,BOTTOM:1}})}),b.lang.module('_$$_una',function(a){a._$_wul=new b.lang.EnumDefinition(function(){return{NO_SORTING:0,FEMALE_FIRST:1,FEMALE_ALWAYS_FIRST:2,MALE_FIRST:3,MALE_ALWAYS_FIRST:4}})})}(y.lang.module('yfiles._R'),y));export var FamilyTreeLayout=y.genealogy.FamilyTreeLayout;export var FamilyType=y.genealogy.FamilyType;export var VerticalNodeAlignment=y.genealogy.VerticalNodeAlignment;export var FamilyMembersSortingPolicy=y.genealogy.FamilyMembersSortingPolicy;export default y;
