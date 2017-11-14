# React Redux Immutable SVG experiment

This is an experiment in how using the internal structure of Immutable List
affects performance of rendering to SVG in a
[React](https://facebook.github.io/react/) &
[Redux](https://github.com/reactjs/redux) app.

This is not an app or a library and nothing in this repository is intended for
production use.

## Challenge

The persistent nature of List from [Immutable](http://facebook.github.io/immutable-js/)
allows efficient updates through structural sharing between old and updated versions.
If the List is used in a Redux store, and React components updated by connecting to the store,
this efficiency is lost because the public API of Immutable List does not expose the
underlying structural sharing, leading to unnecessary copying of data and
updates to React components.

## Approach

In this repository I've experimented with building a UI based on the
above-mentioned technologies, but with a small patch to Immutable List that
allows client code to walk through the VNodes used internally.

As a test case I use time-series-like data. The code appends new items into a
series rapidly while also updating some existing elements. I have included
(mouse wheel based) horizontal zooming and scrolling functionality both to make
it easy to explore the performance impact of off-viewport graphics, and to
explore how the scrolling logic can be factored into its own components.

The ability to walk the VNode structure is used both for creating React
components that represent the data in the list graphically, and for calculating
a bounding box for the data for zooming purposes. In either of these cases it's
important to cut this process short when nothing has changed, instead of
recursing through the whole tree that holds the data for the List. When
generating React components, this is done by returning false from
`shouldComponentUpdate` when a component receives the same VNode as props as it
did on a previous render call. In the bounds calculation the same is achieved by
using a `WeakMap` for memoizing the calculation with the VNode as the key.

## Lessons learned

The above approach results in fairly nice performance. On a laptop, updates to
a List containing tens of thousands of items, represented on the screen with an
SVG image with a circle for each item are fast if only a small part of the whole
series is visible. If a larger portion is visible, rendering and painting starts
to get slow even though the Render code in the client app as well as React
reconciliation are still quick.

Immutable List is not the perfect data structure for the demonstrated case. This
is evidenced by the noticeable pauses when the number of elements exceeds 2^10
(1024) and 2^15 (approx. 32.7k), which means adding a new level to the VNode
tree, and consequently a failure to recognise similarities between old and new
trees in React reconciliation.

Opening Redux devtools slows things down very significantly - not surprising as
they diff the large state structures without being aware of the underlying
sharing.

## Instructions

This experiment is created with
[create-react-app](https://github.com/facebookincubator/create-react-app),
so the usual commands `npm start`, `npm run build` and `npm test` work.
To get started, immutable-js needs to be cloned, patched and built.
A script, `setup-immutable.sh`, is provided for this purpose.

Any benchmarking should naturally be done using production builds.

You can also check out a pre-built
[demo](https://heikela.github.io/react-redux-immutable-trial), but don't forget
it running in a background tab as it will start using considerable memory and
CPU time within minutes.
