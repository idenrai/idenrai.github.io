---
title: "jQuery Sparklines"
date: 2016-02-16
tags: ["Tech", "JavaScript", "jQuery", "bullet"]
tistory_url: "https://idenrai.tistory.com/55"
---

Bullet형 그래프를 뽑아내야 해서, 가벼운 jQuery Plugin을 찾아보았다.

검색 도중, jQuery 차트 라이브러리를 추천하는 글을 발견하였고,

[http://www.sitepoint.com/11-best-jquery-charting-libraries/](http://www.sitepoint.com/11-best-jquery-charting-libraries/)

위의 11가지 라이브러리 중, 내가 선택한 것은 [jQuery Sparklines](http://omnipotent.net/jquery.sparkline/#s-about)

보기에도 간단하고, 엄청 가벼워 보인다.

일단 사용해 본 것은 Bullet Chart뿐이긴 한데,

다른 그래프도 잘 써먹을 수 있을 것 같다.

사용법은 다음과 같다.

1\. [다운로드](http://omnipotent.net/jquery.sparkline/#s-download) 및 등록

2\. 그래프를 집어넣을 곳 만들기

```
<tr id="mnSell">
<td style="vertical-align: middle;">販売額</td>
<td class="highlight"><span class="mnAim" style="color:#ed1717;"></span></td>
.
.
.
<td class="highlight"><span class="nuRatio"></span></td>
<td style="vertical-align:middle; text-align:left;" colspan="20"><span class="ifRecord"></span></td>
</tr>
Colored by Color Scripter
```

3\. 그래프 만들기

```
// グラフをつくる
function makeGraph(graph, aim, sum, scale) {
// グラフの値を
```


만일 위의 처리를 하지 않고, Range를 넘는 값을 그대로 집어넣을 경우,

가장 높은 값을 기준으로 한 그래프가 만들어지게 된다.

예를 들어 Target이 30억이고 Range가 20억이라면,

위의 숫자와는 상관없이, 빨간색 타겟이 숫자 20의 아래(그래프의 최대 width)에 위치하게 될 것이다...!

비율만을 표시하는 것이라면 어느쪽이건 상관 없을 수도 있으나,

위와 같이 수치를 표시하고 싶다면, 위의 로직을 사용하는 것이 좋을 것 같다.

jQuery Sparkline은 mouseOverEvent를 지원하며, Bullet Chart에서의 코드는 다음과 같다.

을 지정해 두고 아래의 코드를 넣는다.

```
// Graph Mouse Over Event
$('.ifRecord').bind('sparklineRegionChange', function(ev) {
var sparkline = ev.sparklines[0],
region = sparkline.getCurrentRegionFields(),
value = region.target;
$('.mouseoverregion').text(region.value + "円");
}).bind('mouseleave', function() {
$('.mouseoverregion').text('');
});
Colored by Color Scripter
```

이를 통해 해당 span에 mouseOver된 그래프의 내용이 나옴을 확인할 수 있다.

Tooltip도 지원하고 있으며, 기본적으로 그래프 위에 마우스를 올리면 해당 값을 표시한다.

그대로 두어도 괜찮을 것 같지만, 내 경우는 Target과 Range값을 Performance에 맞추어 조절하기 때문에

표시하면 오히려 오해를 부르게 된다.

이 경우는 disableTooltips: true을 사용하면 해당 툴팁을 보이지 않게 할 수 있다.

반대로, 표시 문항을 바꾸는 것도 가능하다.

기본적으로는 Target=xxxx와 같은 형태로 결과가 나오지만, tooltipValueLookups: { fields: {r: '最大値', p: '合計', t: '計画'} } 를 사용하여 Target, Range, Performance를 입맛에 따라 명명 가능하다.
