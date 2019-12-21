/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-5119c07b","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./when-1faa3867","./AttributeCompression-5601f533","./IndexDatatype-2bcfc06b","./IntersectionTests-35b85442","./Plane-475170f0","./createTaskProcessorWorker","./EllipsoidTangentPlane-0decb876","./OrientedBoundingBox-f8364937","./TerrainEncoding-1a5de1fe"],function(w,e,t,i,ce,ge,n,me,s,r,h,u,o,xe,a,p,d,f,ve,we){"use strict";var Ce={clipTriangleAtAxisAlignedThreshold:function(e,t,i,n,s,r){var h,u,o;w.defined(r)?r.length=0:r=[],o=t?(h=i<e,u=n<e,s<e):(h=e<i,u=e<n,e<s);var a,p,d,f,l,c,g=h+u+o;return 1===g?h?(a=(e-i)/(n-i),p=(e-i)/(s-i),r.push(1),r.push(2),1!==p&&(r.push(-1),r.push(0),r.push(2),r.push(p)),1!==a&&(r.push(-1),r.push(0),r.push(1),r.push(a))):u?(d=(e-n)/(s-n),f=(e-n)/(i-n),r.push(2),r.push(0),1!==f&&(r.push(-1),r.push(1),r.push(0),r.push(f)),1!==d&&(r.push(-1),r.push(1),r.push(2),r.push(d))):o&&(l=(e-s)/(i-s),c=(e-s)/(n-s),r.push(0),r.push(1),1!==c&&(r.push(-1),r.push(2),r.push(1),r.push(c)),1!==l&&(r.push(-1),r.push(2),r.push(0),r.push(l))):2===g?h||i===e?u||n===e?o||s===e||(p=(e-i)/(s-i),d=(e-n)/(s-n),r.push(2),r.push(-1),r.push(0),r.push(2),r.push(p),r.push(-1),r.push(1),r.push(2),r.push(d)):(c=(e-s)/(n-s),a=(e-i)/(n-i),r.push(1),r.push(-1),r.push(2),r.push(1),r.push(c),r.push(-1),r.push(0),r.push(1),r.push(a)):(f=(e-n)/(i-n),l=(e-s)/(i-s),r.push(0),r.push(-1),r.push(1),r.push(0),r.push(f),r.push(-1),r.push(2),r.push(0),r.push(l)):3!==g&&(r.push(0),r.push(1),r.push(2)),r},computeBarycentricCoordinates:function(e,t,i,n,s,r,h,u,o){var a=i-h,p=h-s,d=r-u,f=n-u,l=1/(d*a+p*f),c=t-u,g=e-h,m=(d*g+p*c)*l,x=(-f*g+a*c)*l,v=1-m-x;return w.defined(o)?(o.x=m,o.y=x,o.z=v,o):new ge.Cartesian3(m,x,v)},computeLineSegmentLineSegmentIntersection:function(e,t,i,n,s,r,h,u,o){var a=(u-r)*(i-e)-(h-s)*(n-t);if(0!=a){var p=((h-s)*(t-r)-(u-r)*(e-s))/a,d=((i-e)*(t-r)-(n-t)*(e-s))/a;return 0<=p&&p<=1&&0<=d&&d<=1?(w.defined(o)||(o=new ge.Cartesian2),o.x=e+p*(i-e),o.y=t+p*(n-t),o):void 0}}},ye=32767,Be=16383,be=[],Ie=[],Ae=[],Te=new ge.Cartographic,ze=new ge.Cartesian3,Ve=[],Me=[],Ne=[],Ee=[],Re=[],He=new ge.Cartesian3,Oe=new me.BoundingSphere,Pe=new ve.OrientedBoundingBox,Ue=new ge.Cartesian2,Fe=new ge.Cartesian3;function Se(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}Se.prototype.clone=function(e){return w.defined(e)||(e=new Se),e.uBuffer=this.uBuffer,e.vBuffer=this.vBuffer,e.heightBuffer=this.heightBuffer,e.normalBuffer=this.normalBuffer,e.index=this.index,e.first=this.first,e.second=this.second,e.ratio=this.ratio,e},Se.prototype.initializeIndexed=function(e,t,i,n,s){this.uBuffer=e,this.vBuffer=t,this.heightBuffer=i,this.normalBuffer=n,this.index=s,this.first=void 0,this.second=void 0,this.ratio=void 0},Se.prototype.initializeFromClipResult=function(e,t,i){var n=t+1;return-1!==e[t]?i[e[t]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=i[e[n]],++n,this.second=i[e[n]],++n,this.ratio=e[n],++n),n},Se.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},Se.prototype.isIndexed=function(){return w.defined(this.index)},Se.prototype.getH=function(){return w.defined(this.index)?this.heightBuffer[this.index]:ce.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},Se.prototype.getU=function(){return w.defined(this.index)?this.uBuffer[this.index]:ce.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},Se.prototype.getV=function(){return w.defined(this.index)?this.vBuffer[this.index]:ce.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};var l=new ge.Cartesian2,c=-1,g=[new ge.Cartesian3,new ge.Cartesian3],m=[new ge.Cartesian3,new ge.Cartesian3];function x(e,t){var i=g[++c],n=m[c];return i=o.AttributeCompression.octDecode(e.first.getNormalX(),e.first.getNormalY(),i),n=o.AttributeCompression.octDecode(e.second.getNormalX(),e.second.getNormalY(),n),ze=ge.Cartesian3.lerp(i,n,e.ratio,ze),ge.Cartesian3.normalize(ze,ze),o.AttributeCompression.octEncode(ze,t),--c,t}Se.prototype.getNormalX=function(){return w.defined(this.index)?this.normalBuffer[2*this.index]:(l=x(this,l)).x},Se.prototype.getNormalY=function(){return w.defined(this.index)?this.normalBuffer[2*this.index+1]:(l=x(this,l)).y};var v=[];function ke(e,t,i,n,s,r,h,u,o){if(0!==h.length){for(var a=0,p=0;p<h.length;)p=v[a++].initializeFromClipResult(h,p,u);for(var d=0;d<a;++d){var f=v[d];if(f.isIndexed())f.newIndex=r[f.index],f.uBuffer=e,f.vBuffer=t,f.heightBuffer=i,o&&(f.normalBuffer=n);else{var l=f.getKey();if(w.defined(r[l]))f.newIndex=r[l];else{var c=e.length;e.push(f.getU()),t.push(f.getV()),i.push(f.getH()),o&&(n.push(f.getNormalX()),n.push(f.getNormalY())),f.newIndex=c,r[l]=c}}}3===a?(s.push(v[0].newIndex),s.push(v[1].newIndex),s.push(v[2].newIndex)):4===a&&(s.push(v[0].newIndex),s.push(v[1].newIndex),s.push(v[2].newIndex),s.push(v[0].newIndex),s.push(v[2].newIndex),s.push(v[3].newIndex))}}return v.push(new Se),v.push(new Se),v.push(new Se),v.push(new Se),d(function(e,t){var i=e.isEastChild,n=e.isNorthChild,s=i?Be:0,r=i?ye:Be,h=n?Be:0,u=n?ye:Be,o=Ve,a=Me,p=Ne,d=Re;o.length=0,a.length=0,p.length=0,d.length=0;var f=Ee;f.length=0;var l={},c=e.vertices,g=e.indices;g=g.subarray(0,e.skirtIndex);var m,x,v,w,C,y=we.TerrainEncoding.clone(e.encoding),B=y.hasVertexNormals,b=e.exaggeration,I=0,A=e.vertexCountWithoutSkirts,T=e.minimumHeight,z=e.maximumHeight,V=new Array(A),M=new Array(A),N=new Array(A),E=B?new Array(2*A):void 0;for(v=x=0;x<A;++x,v+=2){var R=y.decodeTextureCoordinates(c,x,Ue);if(m=y.decodeHeight(c,x)/b,w=ce.CesiumMath.clamp(R.x*ye|0,0,ye),C=ce.CesiumMath.clamp(R.y*ye|0,0,ye),N[x]=ce.CesiumMath.clamp((m-T)/(z-T)*ye|0,0,ye),w<20&&(w=0),C<20&&(C=0),ye-w<20&&(w=ye),ye-C<20&&(C=ye),V[x]=w,M[x]=C,B){var H=y.getOctEncodedNormal(c,x,Fe);E[v]=H.x,E[v+1]=H.y}(i&&Be<=w||!i&&w<=Be)&&(n&&Be<=C||!n&&C<=Be)&&(l[x]=I,o.push(w),a.push(C),p.push(N[x]),B&&(d.push(E[v]),d.push(E[v+1])),++I)}var O=[];O.push(new Se),O.push(new Se),O.push(new Se);var P,U=[];for(U.push(new Se),U.push(new Se),U.push(new Se),x=0;x<g.length;x+=3){var F=g[x],S=g[x+1],k=g[x+2],D=V[F],X=V[S],K=V[k];O[0].initializeIndexed(V,M,N,E,F),O[1].initializeIndexed(V,M,N,E,S),O[2].initializeIndexed(V,M,N,E,k);var L=Ce.clipTriangleAtAxisAlignedThreshold(Be,i,D,X,K,be);(P=0)>=L.length||(P=U[0].initializeFromClipResult(L,P,O))>=L.length||(P=U[1].initializeFromClipResult(L,P,O))>=L.length||(P=U[2].initializeFromClipResult(L,P,O),ke(o,a,p,d,f,l,Ce.clipTriangleAtAxisAlignedThreshold(Be,n,U[0].getV(),U[1].getV(),U[2].getV(),Ie),U,B),P<L.length&&(U[2].clone(U[1]),U[2].initializeFromClipResult(L,P,O),ke(o,a,p,d,f,l,Ce.clipTriangleAtAxisAlignedThreshold(Be,n,U[0].getV(),U[1].getV(),U[2].getV(),Ie),U,B)))}var W=i?-ye:0,Y=n?-ye:0,_=[],j=[],G=[],J=[],Z=Number.MAX_VALUE,q=-Z,Q=Ae;Q.length=0;var $=ge.Ellipsoid.clone(e.ellipsoid),ee=ge.Rectangle.clone(e.childRectangle),te=ee.north,ie=ee.south,ne=ee.east,se=ee.west;for(ne<se&&(ne+=ce.CesiumMath.TWO_PI),x=0;x<o.length;++x)w=(w=Math.round(o[x]))<=s?(_.push(x),0):r<=w?(G.push(x),ye):2*w+W,o[x]=w,C=(C=Math.round(a[x]))<=h?(j.push(x),0):u<=C?(J.push(x),ye):2*C+Y,a[x]=C,(m=ce.CesiumMath.lerp(T,z,p[x]/ye))<Z&&(Z=m),q<m&&(q=m),p[x]=m,Te.longitude=ce.CesiumMath.lerp(se,ne,w/ye),Te.latitude=ce.CesiumMath.lerp(ie,te,C/ye),Te.height=m,$.cartographicToCartesian(Te,ze),Q.push(ze.x),Q.push(ze.y),Q.push(ze.z);var re=me.BoundingSphere.fromVertices(Q,ge.Cartesian3.ZERO,3,Oe),he=ve.OrientedBoundingBox.fromRectangle(ee,Z,q,$,Pe),ue=new we.EllipsoidalOccluder($).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(re.center,Q,3,re.center,Z,He),oe=q-Z,ae=new Uint16Array(o.length+a.length+p.length);for(x=0;x<o.length;++x)ae[x]=o[x];var pe=o.length;for(x=0;x<a.length;++x)ae[pe+x]=a[x];for(pe+=a.length,x=0;x<p.length;++x)ae[pe+x]=ye*(p[x]-Z)/oe;var de,fe=xe.IndexDatatype.createTypedArray(o.length,f);if(B){var le=new Uint8Array(d);t.push(ae.buffer,fe.buffer,le.buffer),de=le.buffer}else t.push(ae.buffer,fe.buffer);return{vertices:ae.buffer,encodedNormals:de,indices:fe.buffer,minimumHeight:Z,maximumHeight:q,westIndices:_,southIndices:j,eastIndices:G,northIndices:J,boundingSphere:re,orientedBoundingBox:he,horizonOcclusionPoint:ue}})});
