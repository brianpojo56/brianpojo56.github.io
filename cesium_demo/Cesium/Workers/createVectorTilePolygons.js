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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-5119c07b","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./when-1faa3867","./AttributeCompression-5601f533","./IndexDatatype-2bcfc06b","./IntersectionTests-35b85442","./Plane-475170f0","./createTaskProcessorWorker","./EllipsoidTangentPlane-0decb876","./OrientedBoundingBox-f8364937","./Color-e0436000"],function(Le,e,a,r,Oe,Pe,n,t,i,o,s,Ue,Fe,f,d,c,u,Se,Re){"use strict";var De=new Pe.Cartesian3,Me=new Pe.Ellipsoid,_e=new Pe.Rectangle,Ge={min:void 0,max:void 0,indexBytesPerElement:void 0};function Ve(e,a,r){var n=a.length,t=2+n*Se.OrientedBoundingBox.packedLength+1+function(e){for(var a=e.length,r=0,n=0;n<a;++n)r+=Re.Color.packedLength+3+e[n].batchIds.length;return r}(r),i=new Float64Array(t),o=0;i[o++]=e,i[o++]=n;for(var s=0;s<n;++s)Se.OrientedBoundingBox.pack(a[s],i,o),o+=Se.OrientedBoundingBox.packedLength;var f=r.length;i[o++]=f;for(var d=0;d<f;++d){var c=r[d];Re.Color.pack(c.color,i,o),o+=Re.Color.packedLength,i[o++]=c.offset,i[o++]=c.count;var u=c.batchIds,h=u.length;i[o++]=h;for(var l=0;l<h;++l)i[o++]=u[l]}return i}var Ye=new Pe.Cartesian3,He=new Pe.Cartesian3,ze=new Pe.Cartesian3,We=new Pe.Cartesian3,je=new Pe.Cartesian3,Ze=new Pe.Cartographic,qe=new Pe.Rectangle;return c(function(e,a){var r,n,t,i;r=e.packedBuffer,n=new Float64Array(r),t=0,Ge.indexBytesPerElement=n[t++],Ge.min=n[t++],Ge.max=n[t++],Pe.Cartesian3.unpack(n,t,De),t+=Pe.Cartesian3.packedLength,Pe.Ellipsoid.unpack(n,t,Me),t+=Pe.Ellipsoid.packedLength,Pe.Rectangle.unpack(n,t,_e),i=2===Ge.indexBytesPerElement?new Uint16Array(e.indices):new Uint32Array(e.indices);var o,s,f,d=new Uint16Array(e.positions),c=new Uint32Array(e.counts),u=new Uint32Array(e.indexCounts),h=new Uint32Array(e.batchIds),l=new Uint32Array(e.batchTableColors),g=new Array(c.length),p=De,b=Me,C=_e,y=Ge.min,I=Ge.max,m=e.minimumHeights,v=e.maximumHeights;Le.defined(m)&&Le.defined(v)&&(m=new Float32Array(m),v=new Float32Array(v));var w=d.length/2,x=d.subarray(0,w),A=d.subarray(w,2*w);Ue.AttributeCompression.zigZagDeltaDecode(x,A);var E=new Float32Array(3*w);for(o=0;o<w;++o){var N=x[o],T=A[o],k=Oe.CesiumMath.lerp(C.west,C.east,N/32767),B=Oe.CesiumMath.lerp(C.south,C.north,T/32767),L=Pe.Cartographic.fromRadians(k,B,0,Ze),O=b.cartographicToCartesian(L,Ye);Pe.Cartesian3.pack(O,E,3*o)}var P=c.length,U=new Array(P),F=new Array(P),S=0,R=0;for(o=0;o<P;++o)U[o]=S,F[o]=R,S+=c[o],R+=u[o];var D,M=new Float32Array(3*w*2),_=new Uint16Array(2*w),G=new Uint32Array(F.length),V=new Uint32Array(u.length),Y=[],H={};for(o=0;o<P;++o)f=l[o],Le.defined(H[f])?(H[f].positionLength+=c[o],H[f].indexLength+=u[o],H[f].batchIds.push(o)):H[f]={positionLength:c[o],indexLength:u[o],offset:0,indexOffset:0,batchIds:[o]};var z=0,W=0;for(f in H)if(H.hasOwnProperty(f)){(D=H[f]).offset=z,D.indexOffset=W;var j=2*D.positionLength,Z=2*D.indexLength+6*D.positionLength;z+=j,W+=Z,D.indexLength=Z}var q=[];for(f in H)H.hasOwnProperty(f)&&(D=H[f],q.push({color:Re.Color.fromRgba(parseInt(f)),offset:D.indexOffset,count:D.indexLength,batchIds:D.batchIds}));for(o=0;o<P;++o){var J=(D=H[f=l[o]]).offset,K=3*J,Q=J,X=U[o],$=c[o],ee=h[o],ae=y,re=I;Le.defined(m)&&Le.defined(v)&&(ae=m[o],re=v[o]);var ne=Number.POSITIVE_INFINITY,te=Number.NEGATIVE_INFINITY,ie=Number.POSITIVE_INFINITY,oe=Number.NEGATIVE_INFINITY;for(s=0;s<$;++s){var se=Pe.Cartesian3.unpack(E,3*X+3*s,Ye);b.scaleToGeodeticSurface(se,se);var fe=b.cartesianToCartographic(se,Ze),de=fe.latitude,ce=fe.longitude;ne=Math.min(de,ne),te=Math.max(de,te),ie=Math.min(ce,ie),oe=Math.max(ce,oe);var ue=b.geodeticSurfaceNormal(se,He),he=Pe.Cartesian3.multiplyByScalar(ue,ae,ze),le=Pe.Cartesian3.add(se,he,We);he=Pe.Cartesian3.multiplyByScalar(ue,re,he);var ge=Pe.Cartesian3.add(se,he,je);Pe.Cartesian3.subtract(ge,p,ge),Pe.Cartesian3.subtract(le,p,le),Pe.Cartesian3.pack(ge,M,K),Pe.Cartesian3.pack(le,M,K+3),_[Q]=ee,_[Q+1]=ee,K+=6,Q+=2}(C=qe).west=ie,C.east=oe,C.south=ne,C.north=te,g[o]=Se.OrientedBoundingBox.fromRectangle(C,y,I,b);var pe=D.indexOffset,be=F[o],Ce=u[o];for(G[o]=pe,s=0;s<Ce;s+=3){var ye=i[be+s]-X,Ie=i[be+s+1]-X,me=i[be+s+2]-X;Y[pe++]=2*ye+J,Y[pe++]=2*Ie+J,Y[pe++]=2*me+J,Y[pe++]=2*me+1+J,Y[pe++]=2*Ie+1+J,Y[pe++]=2*ye+1+J}for(s=0;s<$;++s){var ve=s,we=(s+1)%$;Y[pe++]=2*ve+1+J,Y[pe++]=2*we+J,Y[pe++]=2*ve+J,Y[pe++]=2*ve+1+J,Y[pe++]=2*we+1+J,Y[pe++]=2*we+J}D.offset+=2*$,D.indexOffset=pe,V[o]=pe-G[o]}Y=Fe.IndexDatatype.createTypedArray(M.length/3,Y);for(var xe=q.length,Ae=0;Ae<xe;++Ae){for(var Ee=q[Ae].batchIds,Ne=0,Te=Ee.length,ke=0;ke<Te;++ke)Ne+=V[Ee[ke]];q[Ae].count=Ne}var Be=Ve(2===Y.BYTES_PER_ELEMENT?Fe.IndexDatatype.UNSIGNED_SHORT:Fe.IndexDatatype.UNSIGNED_INT,g,q);return a.push(M.buffer,Y.buffer,G.buffer,V.buffer,_.buffer,Be.buffer),{positions:M.buffer,indices:Y.buffer,indexOffsets:G.buffer,indexCounts:V.buffer,batchIds:_.buffer,packedBuffer:Be.buffer}})});
