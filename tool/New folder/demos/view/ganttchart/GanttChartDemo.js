/****************************************************************************
 ** @license
 ** This demo file is part of yFiles for HTML 2.1.0.6.
 ** Copyright (c) 2000-2018 by yWorks GmbH, Vor dem Kreuzberg 28,
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ** yFiles demo files exhibit yFiles for HTML functionalities. Any redistribution
 ** of demo files in source code or binary form, with or without
 ** modification, is not permitted.
 **
 ** Owners of a valid software license for a yFiles for HTML version that this
 ** demo is shipped with are allowed to use the demo source code as basis
 ** for their own yFiles for HTML powered applications. Use of such programs is
 ** governed by the rights and conditions as set out in the yFiles for HTML
 ** license agreement.
 **
 ** THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 ** WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 ** MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 ** NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 ** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 ** TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 ** PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 ** LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 ** NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 ** SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **
 ***************************************************************************/
'use strict'

/**
 * This demo shows how to create a Gantt Chart Component with yFiles for HTML.
 *
 * For the parsing, manipulating and calculation of dates, the library Moment.js [https://momentjs.com/] is used.
 *
 * The data consists of tasks and activities. Each activity is assigned to a task and has a start and end time.
 * Optionally, an activity can have a name, a lead time, a follow-up time and dependencies on other tasks.
 *
 * The translation between graph coordinates and dates happens in Mapper.js.
 *
 * This demo uses a special node style that is able to render the lead and follow-up time of each activity. The hatched
 * parts of a node visualization are not actually part of the node layout, but considered for visibility and bounds
 * checks. A special edge style calculates an orthogonal path for otherwise straight-line (bend-less) edges, using a
 * simple routing algorithm.
 *
 * The timeline and task area are separate {@link yfiles.view.GraphComponent}s. The tasks are also modeled as
 * graph nodes, while the timeline is rendered as a background visual using HTML canvas.
 *
 * This demo customizes a lot of interactions. For example, the resizing of nodes is implemented using
 * special invisible handle implementations that allow to change the width of a node. Also there are additional handles
 * to manipulate the lead and follow-up time. Please see the implementations for details.
 */

require.config({
  paths: {
    yfiles: '../../../lib/umd/yfiles/',
    utils: '../../utils/',
    resources: '../../resources/',
    moment: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/'
  }
})

require([
  'yfiles/view-editor',
  'resources/demo-app',
  './resources/datamodel.js',
  './ViewportLimiter.js',
  './ActivityNodeStyle.js',
  './ActivityNodeHighlightStyle.js',
  './RoutingEdgeStyle.js',
  './Mapper.js',
  './ActivityNodePortLocationModel.js',
  './TimelineVisual.js',
  './GridVisual.js',
  './PortCandidateProvider.js',
  './NodeReshapeHandleProvider.js',
  './NodeResizeHandleInputMode.js',
  './NodeSnapResultProvider.js',
  './TimeHandle.js',
  './CreateActivityInputMode.js',
  'resources/license'
], (
  /** @type {yfiles_namespace} */ /** typeof yfiles */ yfiles,
  app,
  dataModel,
  ViewportLimiter,
  ActivityNodeStyle,
  ActivityNodeHighlightStyle,
  RoutingEdgeStyle,
  Mapper,
  ActivityNodePortLocationModel,
  TimelineVisual,
  GridVisual,
  PortCandidateProvider,
  NodeReshapeHandleProvider,
  NodeResizeHandleInputMode,
  NodeSnapResultProvider,
  TimeHandle,
  CreateActivityInputMode
) => {
  /** @type {yfiles.view.GraphComponent} */
  let mainComponent = null

  /** @type {yfiles.view.GraphComponent} */
  let taskComponent = null

  /** @type {yfiles.view.GraphComponent} */
  let timelineComponent = null

  /**
   * A helper class that handles the data model and maps graph coordinates to the corresponding dates.
   * @type {Mapper}
   */
  const mapper = new Mapper(dataModel)

  function run() {
    // create the three components
    taskComponent = createTaskComponent()
    mainComponent = createMainGraphComponent()
    timelineComponent = createTimelineGraphComponent()

    // show the activity info box for the current item
    mainComponent.addCurrentItemChangedListener(() => {
      const item = mainComponent.currentItem
      if (yfiles.graph.INode.isInstance(item)) {
        showActivityInfo(item.tag.activity, item.layout.center)
      } else {
        hideActivityInfo()
      }
    })

    // configure graph item styles
    setDefaultStyles()

    // customize node and edge highlight
    initializeHighlightStyles()

    configureGraphDecorations()

    synchronizeComponents()

    configureInteraction()

    // create the graph items from the source data
    populateGraph()

    updateTasks()

    app.show(mainComponent)

    mainComponent.updateContentRect()
    taskComponent.updateContentRect()
  }

  /**
   * Creates a the graph from the data model.
   */
  function populateGraph() {
    // now create the nodes and edges
    createGraph()
    // put overlapping nodes in subrows
    updateSubrows(false)
  }

  /**
   * Updates the current graph from the data model
   */
  function createGraph() {
    const graph = mainComponent.graph

    const newNodesMap = new Map()
    // create the activity nodes
    dataModel.activities.forEach(activity => {
      const minX = mapper.getX(activity.startDate)
      const maxX = mapper.getX(activity.endDate)
      const y = mapper.getActivityY(activity)
      const height = Mapper.activityHeight

      const leadTimeWidth = mapper.hoursToWorldLength(activity.leadTime || 0)
      const followUpTimeWidth = mapper.hoursToWorldLength(activity.followUpTime || 0)

      const task = mapper.getTaskForId(activity.taskId)

      const style = task.color ? new ActivityNodeStyle(task.color) : graph.nodeDefaults.style

      const node = graph.createNode({
        layout: new yfiles.geometry.Rect(minX, y, maxX - minX, height),
        tag: {
          activity,
          leadTimeWidth,
          followUpTimeWidth
        },
        style
      })
      if (activity.name) {
        graph.addLabel(node, activity.name)
      }
      newNodesMap.set(activity.id, node)
    })

    dataModel.activities.forEach(activity => {
      const dependencies = activity.dependencies
      if (!dependencies) {
        return
      }

      const targetNode = newNodesMap.get(activity.id)
      dependencies.forEach(dependency => {
        const sourceNode = newNodesMap.get(dependency)

        const sourcePort = graph.addPort(sourceNode, ActivityNodePortLocationModel.RIGHT)
        const targetPort = graph.addPort(targetNode, ActivityNodePortLocationModel.LEFT)
        graph.createEdge(sourcePort, targetPort)
      })
    })
  }

  /**
   * Updates the task view.
   */
  function updateTasks() {
    taskComponent.graph.clear()
    dataModel.tasks.forEach(task => {
      // get the y coordinate
      const from = mapper.getTaskY(task) - Mapper.taskSpacing * 0.5 + 1
      // get the height
      const height = mapper.getCompleteTaskHeight(task) + Mapper.taskSpacing

      // create the node
      const color = task.color || new yfiles.view.Color(51, 102, 255)
      taskComponent.graph.createNode({
        layout: new yfiles.geometry.Rect(0, from, 150, height - 1),
        tag: task,
        style: new yfiles.styles.ShapeNodeStyle({
          fill: new yfiles.view.SolidColorFill(color.r, color.g, color.b, 200),
          stroke: null
        }),
        labels: [task.name]
      })
    })
  }

  /**
   * Calculates the new height for each task row, spreading overlapping activity nodes
   * on multiple subrows. The calculated data is stored
   * in the mapper.
   */
  function updateSubrowMappings() {
    // maps the task id to the task's activities
    const taskId2Activities = new Map()
    // maps each task to its subrow index
    const subrowMap = mapper.subrowMap
    // maps each task row to the number of subrows
    const subrowCountMap = mapper.subrowCountMap

    subrowMap.clear()
    subrowCountMap.clear()

    // create the task mapping for each activity and initialize the subrow mapping with 0
    mainComponent.graph.nodes.forEach(node => {
      const activity = node.tag.activity
      const taskId = activity.taskId
      if (!taskId2Activities.has(taskId)) {
        taskId2Activities.set(taskId, [])
      }
      taskId2Activities.get(taskId).push(node)
      subrowMap.set(activity, 0)
    })

    // calculate the subrow mapping for each task
    dataModel.tasks.forEach(task => {
      const maxRowIndex = calculateMappingForTask(task, taskId2Activities, subrowMap)
      subrowCountMap.set(task.id, maxRowIndex + 1)
    })
  }

  /**
   * Analyzes node overlaps within the same task lane
   * and splits up those nodes in subrows.
   * @param animate Whether to animate the resulting node layout change
   */
  function updateSubrows(animate) {
    // update the information mapping the tasks to subrows and rows to the number of subrows
    updateSubrowMappings()
    // a list of node animations used to collect and execute them all at the same time
    const animations = new yfiles.collections.List()
    mainComponent.graph.nodes.forEach(node => {
      const activity = node.tag.activity
      // get the subrow calculated earlier
      const subrowIndex = mapper.getSubrowIndex(activity)
      if (typeof subrowIndex !== 'undefined') {
        const layout = node.layout

        const yTop = mapper.getActivityY(activity, subrowIndex)
        // calculate the new node layout
        const newLayout = new yfiles.geometry.Rect(layout.x, yTop, layout.width, layout.height)
        // check if need to update the current layout
        if (!newLayout.equals(node.layout)) {
          if (animate) {
            // create an animated transition
            const animation = yfiles.view.IAnimation.createNodeAnimation(
              mainComponent.graph,
              node,
              newLayout,
              new yfiles.lang.TimeSpan(200)
            )
            animations.add(animation)
          } else {
            // set the new bounds without animation
            mainComponent.graph.setNodeLayout(
              node,
              new yfiles.geometry.Rect(layout.x, yTop, layout.width, layout.height)
            )
          }
        }
      }
    })

    if (animate && animations.size > 0) {
      // create a composite animation that executes all node transitions at the same time
      const compositeAnimation = yfiles.view.IAnimation.createParallelAnimation(animations)
      mainComponent.inputMode.waiting = true
      // start the animation
      new yfiles.view.Animator(mainComponent).animate(compositeAnimation).then(() => {
        mainComponent.inputMode.waiting = false
      })
    }
  }

  /***
   * Calculates the subrow mapping for a given task.
   * In order to do that, a sweep line, or scan line algorithm is used:
   * The tasks are sorted by their x-coordinate. The algorithm runs over
   * the activities from left to right and chooses the first available subrow
   * for each task until all activities have been assigned to a subrow.
   * @returns {number} The number of subrows needed for this task row.
   */
  function calculateMappingForTask(task, taskId2Activities, subrowMap) {
    let maxRowIndex = 0
    // get the array of activities for this task
    const activityNodes = taskId2Activities.get(task.id)
    if (activityNodes) {
      // create an array for the sweep-line algorithm
      const sweeplineData = []
      // push the information about start and end dates for each activity to the array
      activityNodes.forEach(node => {
        const bounds = node.style.renderer
          .getBoundsProvider(node, node.style)
          .getBounds(mainComponent.canvasContext)
        const xStart = bounds.x
        const xEnd = bounds.x + bounds.width
        const activity = node.tag.activity
        // push the information where the activity starts
        sweeplineData.push({
          x: xStart,
          activity,
          open: true
        })
        // push the information where the task ends
        sweeplineData.push({
          x: xEnd,
          activity,
          open: false
        })
      })

      // sort by x coordinates
      sweeplineData.sort((t1, t2) => t1.x - t2.x)
      const subRows = {} // holds information about available and unavailable subrows
      // sweep (scan) the data
      sweeplineData.forEach(d => {
        // a new task begins
        if (d.open) {
          // search for the first available subrow
          let i = 0
          while (subRows[i]) {
            i++
          }
          // put the activity in the subrow
          subRows[i] = d.activity
          // possibly increment the max row information
          maxRowIndex = Math.max(maxRowIndex, i)
          // save the 'activity to subrow' information in the mapping
          subrowMap.set(d.activity, i)
        } else {
          // a task ends
          const i = subrowMap.get(d.activity)
          // delete it from the subrows storage
          delete subRows[i]
        }
      })
    }
    // return the number of rows needed
    return maxRowIndex
  }

  /**
   *  Creates and assigns the default styles for graph items
   */
  function setDefaultStyles() {
    // create the node style
    // set the style as default in the graph
    mainComponent.graph.nodeDefaults.style = new ActivityNodeStyle(
      new yfiles.view.Color(51, 102, 255)
    )
    mainComponent.graph.nodeDefaults.labels.style = new yfiles.styles.DefaultLabelStyle({
      textFill: '#fff',
      wrapping: yfiles.view.TextWrapping.CHARACTER_ELLIPSIS,
      horizontalTextAlignment: yfiles.view.HorizontalTextAlignment.CENTER,
      verticalTextAlignment: yfiles.view.VerticalTextAlignment.CENTER
    })
    mainComponent.graph.nodeDefaults.labels.layoutParameter =
      yfiles.graph.InteriorStretchLabelModel.CENTER

    // set the edge style as graph default
    mainComponent.graph.edgeDefaults.style = new RoutingEdgeStyle(10, 10)
  }

  /**
   * Initialize the styles that are used for highlighting items.
   */
  function initializeHighlightStyles() {
    // decorate the nodes and edges with custom hover highlight styles
    const decorator = mainComponent.graph.decorator

    const color = yfiles.view.Color.GOLDENROD

    // configure the node highlight.
    const nodeStyleHighlight = new yfiles.view.NodeStyleDecorationInstaller({
      nodeStyle: new ActivityNodeHighlightStyle(color),
      margins: 2
    })
    decorator.nodeDecorator.highlightDecorator.setImplementation(nodeStyleHighlight)

    // configure the edge highlight
    const edgeStyle = new RoutingEdgeStyle(10, 10, new yfiles.view.SolidColorFill(color), 3)
    const edgeStyleHighlight = new yfiles.view.EdgeStyleDecorationInstaller({ edgeStyle })
    decorator.edgeDecorator.highlightDecorator.setImplementation(edgeStyleHighlight)
  }

  /***
   * This method uses the graph decorator to customize various things about the
   * interaction.
   */
  function configureGraphDecorations() {
    // install a custom port candidate provider that's needed for edge creation
    const nodeDecorator = mainComponent.graph.decorator.nodeDecorator
    nodeDecorator.portCandidateProviderDecorator.setFactory(node => new PortCandidateProvider(node))

    // install a custom reshape handle provider to customize node resizing behavior
    nodeDecorator.reshapeHandleProviderDecorator.setImplementationWrapper(
      (node, delegateProvider) =>
        new NodeReshapeHandleProvider.NodeReshapeHandleProvider(node, delegateProvider)
    )

    // install a custom snap result provider to let the nodes snap to hours
    nodeDecorator.nodeSnapResultProviderDecorator.setImplementation(new NodeSnapResultProvider())

    // install a custom handle provider that provides the lead/followUp time handles
    nodeDecorator.handleProviderDecorator.setFactory(
      node => new TimeHandle.TimeHandleProvider(node)
    )
  }

  /**
   *  Initializes interaction.
   */
  function configureInteraction() {
    const graphComponent = mainComponent
    // create and configure a new editor mode
    const graphEditorInputMode = new yfiles.input.GraphEditorInputMode()

    initializeSnapping(graphEditorInputMode)

    // configure editing
    graphEditorInputMode.allowCreateBend = false // disable bend creation
    graphEditorInputMode.allowCreateNode = false // disable node creation via click
    graphEditorInputMode.showHandleItems = yfiles.graph.GraphItemTypes.NODE // show only node handles
    graphEditorInputMode.moveViewportInputMode.enabled = false // disable default panning
    graphEditorInputMode.adjustContentRectPolicy = yfiles.input.AdjustContentRectPolicy.NEVER
    graphEditorInputMode.clickHitTestOrder = [
      yfiles.graph.GraphItemTypes.BEND,
      yfiles.graph.GraphItemTypes.EDGE_LABEL,
      yfiles.graph.GraphItemTypes.NODE,
      yfiles.graph.GraphItemTypes.EDGE,
      yfiles.graph.GraphItemTypes.NODE_LABEL,
      yfiles.graph.GraphItemTypes.PORT
    ]

    graphEditorInputMode.focusableItems = yfiles.graph.GraphItemTypes.NODE

    // On clicks on empty space, set currentItem to <code>null</code> to hide the node info
    graphEditorInputMode.addCanvasClickedListener(hideActivityInfo)

    // disable default marquee selection
    graphEditorInputMode.marqueeSelectionInputMode.enabled = false

    // assign a customized CreateEdgeInputMode
    configureCreateEdgeInputMode(graphEditorInputMode.createEdgeInputMode)

    // assign a custom HandleInputMode for node resize handles
    graphEditorInputMode.handleInputMode = createHandleInputMode()

    // add an input mode for creating new tasks
    const createTaskInputMode = createCreateActivityInputMode()
    // add the input mode with the same priority as MarqueeSelectionInputMode
    createTaskInputMode.priority = graphEditorInputMode.marqueeSelectionInputMode.priority
    graphEditorInputMode.add(createTaskInputMode)

    // disable default move gestures
    graphEditorInputMode.moveInputMode.enabled = false
    // create and add input mode that moves unselected nodes
    configureMoveInputMode(graphEditorInputMode)

    graphEditorInputMode.textEditorInputMode.addEditingStartedListener(hideActivityInfo)

    graphEditorInputMode.addLabelTextChangedListener((sender, args) => {
      const node = args.owner
      const label = args.item
      node.tag.activity.name = label.text
    })

    // configure node and edge highlights on hover
    graphEditorInputMode.itemHoverInputMode.enabled = true
    graphEditorInputMode.itemHoverInputMode.hoverItems =
      yfiles.graph.GraphItemTypes.EDGE | yfiles.graph.GraphItemTypes.NODE
    graphEditorInputMode.itemHoverInputMode.discardInvalidItems = false
    graphEditorInputMode.itemHoverInputMode.addHoveredItemChangedListener(onHoveredItemChanged)

    // assign editor input mode
    graphComponent.inputMode = graphEditorInputMode
  }

  /**
   * Initializes the node snapping feature
   */
  function initializeSnapping(graphEditorInputMode) {
    const snapContext = new yfiles.input.GraphSnapContext({
      enabled: true,
      snapBendAdjacentSegments: false,
      snapBendsToSnapLines: false,
      snapNodesToSnapLines: false,
      snapOrthogonalMovement: false,
      snapPortAdjacentSegments: false,
      snapSegmentsToSnapLines: false
    })
    graphEditorInputMode.snapContext = snapContext

    // install a grid to enable snapping to hours
    const gridInfo = new yfiles.view.GridInfo()
    gridInfo.horizontalSpacing = Mapper.dayWidth

    snapContext.gridSnapType = yfiles.input.GridSnapTypes.VERTICAL_LINES
    snapContext.visualizeSnapResults = false
    snapContext.nodeGridConstraintProvider = new yfiles.input.GridConstraintProvider(gridInfo)
  }

  /**
   * Configures CreateEdgeInputMode
   */
  function configureCreateEdgeInputMode(createEdgeInputMode) {
    // start edge creation on shift + left mouse button
    createEdgeInputMode.prepareRecognizer = yfiles.input.EventRecognizers.createAndRecognizer(
      yfiles.input.MouseEventRecognizers.LEFT_DOWN,
      yfiles.input.KeyEventRecognizers.SHIFT_IS_DOWN
    )

    // configure edge creation
    createEdgeInputMode.allowSelfloops = false
    createEdgeInputMode.allowCreateBend = false
    createEdgeInputMode.forceSnapToCandidate = true
    // only allow edges to connect to explicit candidates to make sure edges only connect to the correct side of a
    // node
    createEdgeInputMode.useHitItemsCandidatesOnly = true

    createEdgeInputMode.enforceBendCreationRecognizer(yfiles.input.EventRecognizers.NEVER)
    createEdgeInputMode.portCandidateResolutionRecognizer(yfiles.input.EventRecognizers.NEVER)
  }

  /**
   * Creates a custom HandleInputMode that provides the node resize handles
   */
  function createHandleInputMode() {
    // create the customized input mode
    const handleInputMode = new NodeResizeHandleInputMode()

    handleInputMode.addDragStartedListener(() => {
      hideActivityInfo()
      // show info box
      const handle = handleInputMode.currentHandle
      const location = handle.location.toPoint()
      let text
      if (handle instanceof TimeHandle.TimeHandle) {
        const duration = mapper.worldLengthToHours(handle.getTime())
        const label = handle.isFollowUpTime() ? 'Follow-up Time' : 'Lead Time'
        text = `${label}: ${duration} h`
      } else {
        text = mapper.getDate(location.x).format('Do MMM HH:mm')
      }

      showInfo(text, location)
    })

    handleInputMode.addDraggedListener(() => {
      // show info box
      const handle = handleInputMode.currentHandle
      const location = handle.location.toPoint()
      let text
      if (handle instanceof TimeHandle.TimeHandle) {
        const duration = mapper.worldLengthToHours(handle.getTime())
        const label = handle.isFollowUpTime() ? 'Follow-up Time' : 'Lead Time'
        text = `${label}: ${duration} h`
      } else {
        text = mapper.getDate(location.x).format('Do MMM HH:mm')
      }

      showInfo(text, location)
    })

    // apply the graph modifications when a handle has been dragged
    handleInputMode.addDragFinishedListener(() => {
      hideInfo()
      const handle = handleInputMode.currentHandle
      if (handle instanceof NodeReshapeHandleProvider.NodeResizeHandle) {
        const node = handle.item
        if (handle.position === yfiles.input.HandlePositions.WEST) {
          onStartDateChanged(node)
        } else if (handle.position === yfiles.input.HandlePositions.EAST) {
          onEndDateChanged(node)
        }
      } else if (handle instanceof TimeHandle.TimeHandle) {
        onTimeDecorationChanged(handle.item)
      }
    })

    handleInputMode.addDragCanceledListener(() => {
      hideInfo()
    })

    return handleInputMode
  }

  /**
   *  Creates an input mode that creates new activity nodes
   */
  function createCreateActivityInputMode() {
    // create the customized input mode
    const createActivityInputMode = new CreateActivityInputMode(mapper, onNodeCreated)

    createActivityInputMode.addDragStartedListener(() => {
      hideActivityInfo()
      const dummyNode = createActivityInputMode.dummyNode
      const text = dummyNode.tag.activity.endDate.format('Do MMM HH:mm')
      showInfo(text, dummyNode.layout.topRight)
    })
    createActivityInputMode.addDraggedListener(() => {
      const dummyNode = createActivityInputMode.dummyNode
      const text = dummyNode.tag.activity.endDate.format('Do MMM HH:mm')
      showInfo(text, dummyNode.layout.topRight)
    })
    createActivityInputMode.addDragFinishedListener(hideInfo)
    createActivityInputMode.addDragCanceledListener(hideInfo)

    return createActivityInputMode
  }

  /**
   * Called when the mouse hovers over a different item.
   */
  function onHoveredItemChanged(sender, hoveredItemChangedEventArgs) {
    const manager = mainComponent.highlightIndicatorManager

    // remove previous highlights
    manager.clearHighlights()
    const item = hoveredItemChangedEventArgs.item
    if (item !== null) {
      // highlight the node or edge
      manager.addHighlight(item)
      if (yfiles.graph.INode.isInstance(item)) {
        // also highlight dependencies and their activities
        mainComponent.graph.inEdgesAt(item).forEach(edge => {
          manager.addHighlight(edge)
          manager.addHighlight(edge.sourceNode)
        })
      } else if (yfiles.graph.IEdge.isInstance(item)) {
        // highlight the source and target activity
        manager.addHighlight(item.sourceNode)
        manager.addHighlight(item.targetNode)
      }
    }
  }

  function showInfo(text, location) {
    const info = document.getElementById('info')
    const pageLocation = mainComponent.toPageFromView(mainComponent.toViewCoordinates(location))
    info.textContent = text
    const width = info.clientWidth
    const height = info.clientHeight
    info.style.left = `${pageLocation.x - width * 0.5}px`
    info.style.top = `${pageLocation.y - height - 10}px`
    info.style.display = 'block'
  }

  function showActivityInfo(activity, location) {
    const viewLocation = mainComponent.toViewCoordinates(location)
    const pageLocation = mainComponent.toPageFromView(viewLocation)

    const duration = mapper.getTotalActivityDuration(activity)

    document.querySelector('#nodeInfo span[data-name="name"]').textContent = activity.name
    document.querySelector('#nodeInfo span[data-name="start"]').textContent = Mapper.format(
      activity.startDate,
      'dddd, LL, HH:mm:ss'
    )
    document.querySelector('#nodeInfo span[data-name="end"]').textContent = Mapper.format(
      activity.endDate,
      'dddd, LL, HH:mm:ss'
    )
    document.querySelector('#nodeInfo span[data-name="lead"]').textContent = `${activity.leadTime ||
      0}`
    document.querySelector('#nodeInfo span[data-name="duration"]').textContent = `${duration}`
    document.querySelector(
      '#nodeInfo span[data-name="followUp"]'
    ).textContent = `${activity.followUpTime || 0}`
    document.querySelector('#nodeInfo span[data-name="task"]').textContent = `${
      mapper.getTaskForId(activity.taskId).name
    }`
    const nodeInfo = document.getElementById('nodeInfo')
    nodeInfo.style.display = 'block'
    const width = nodeInfo.clientWidth
    const height = nodeInfo.clientHeight
    nodeInfo.style.left = `${pageLocation.x - width * 0.5}px`
    nodeInfo.style.top =
      viewLocation.y > 200 ? `${pageLocation.y - height - 30}px` : `${pageLocation.y + 30}px`
  }

  function hideInfo() {
    document.getElementById('info').style.display = 'none'
  }

  function hideActivityInfo() {
    document.getElementById('nodeInfo').style.display = 'none'
    // set the current item to null so the node info can be opened on the same node again
    mainComponent.currentItem = null
  }

  /**
   * Creates an input mode that moves unselected nodes when shift is not pressed..
   */
  function configureMoveInputMode(graphEditorInputMode) {
    // configure an input mode that moves unselected nodes
    const moveUnselectedInputMode = graphEditorInputMode.moveUnselectedInputMode
    moveUnselectedInputMode.priority = graphEditorInputMode.createEdgeInputMode.priority + 1
    moveUnselectedInputMode.enabled = true

    moveUnselectedInputMode.addDragStartedListener(() => {
      hideActivityInfo()
      if (moveUnselectedInputMode.affectedItems.size < 1) {
        return
      }
      // show info box
      const item = moveUnselectedInputMode.affectedItems.first()
      const location = item.layout.topLeft
      const text = mapper.getDate(location.x).format('Do MMM HH:mm')

      showInfo(text, location)
    })

    moveUnselectedInputMode.addDraggedListener(() => {
      if (moveUnselectedInputMode.affectedItems.size < 1) {
        return
      }
      // show info box
      const item = moveUnselectedInputMode.affectedItems.first()
      const location = item.layout.topLeft
      const text = mapper.getDate(location.x).format('Do MMM HH:mm')

      showInfo(text, location)
    })

    moveUnselectedInputMode.addDragFinishedListener(() => {
      hideInfo()
      if (moveUnselectedInputMode.affectedItems.size > 0) {
        onNodeMoved(moveUnselectedInputMode.affectedItems.first(), true)
      }
    })

    moveUnselectedInputMode.addDragCanceledListener(hideInfo)
  }

  /**
   * Synchronizes scrolling of the main component with the other components.
   */
  function synchronizeComponents() {
    mainComponent.addViewportChangedListener(src => {
      hideActivityInfo()
      // synchronize x-axis with time control and timeline control
      timelineComponent.viewPoint = new yfiles.geometry.Point(
        src.viewPoint.x,
        timelineComponent.viewPoint.y
      )
      // synchronize y-axis with task control
      taskComponent.viewPoint = new yfiles.geometry.Point(
        taskComponent.viewPoint.x,
        src.viewPoint.y
      )
    })
  }

  /**
   * Called when the start date of a node has been changed. Updates the start date in the model.
   * @param node The node whose start date has been changed.
   */
  function onStartDateChanged(node) {
    // synchronize start time
    const activity = node.tag.activity
    const startDate = mapper.getDate(node.layout.x)
    activity.startDate = startDate.format('YYYY-MM-DDTHH:mm:ssZ')
    onGraphModified()
  }

  /**
   * Called when the end date of a node has been changed. Updates the end date in the model.
   * @param node The node whose end date has been changed.
   */
  function onEndDateChanged(node) {
    // synchronize end time
    const activity = node.tag.activity
    const endDate = mapper.getDate(node.layout.topRight.x)
    activity.endDate = endDate.format('YYYY-MM-DDTHH:mm:ssZ')
    onGraphModified()
  }

  /**
   * Called when the lead time or follow up time of an activity has changed
   * @param node The node whose time has been changed.
   */
  function onTimeDecorationChanged(node) {
    const activity = node.tag.activity
    if (node.tag.leadTimeWidth) {
      activity.leadTime = mapper.worldLengthToHours(node.tag.leadTimeWidth)
    } else {
      activity.leadTime = 0
    }
    if (node.tag.followUpTimeWidth) {
      activity.followUpTime = mapper.worldLengthToHours(node.tag.followUpTimeWidth)
    } else {
      activity.followUpTime = 0
    }
    onGraphModified()
  }

  /**
   * Called when a node has been moved. Updates the start and end position and task in the model.
   * @param node the node that has been moved.
   */
  function onNodeMoved(node) {
    updateModel(node)
    onGraphModified()
  }

  /**
   * Called when a node has been created. Updates the list of tasks in the data model as well as the task mapping.
   * @param node the node that has been created.
   */
  function onNodeCreated(node) {
    updateModel(node)
    onGraphModified()
  }

  /**
   * Writes the start and end dates of the given node
   * back to the data model.
   */
  function updateModel(node) {
    // synchronize start and end time
    const activity = node.tag.activity
    const layout = node.layout
    activity.startDate = mapper.getDate(layout.x).format('YYYY-MM-DDTHH:mm:ssZ')
    activity.endDate = mapper.getDate(layout.topRight.x).format('YYYY-MM-DDTHH:mm:ssZ')

    const newTask = mapper.getTask(layout.y)
    if (activity.taskId !== newTask.id) {
      activity.taskId = newTask.id
    }
  }

  /**
   * Does the necessary updates after all structural graph changes,
   * i.e. updating the subrow information and refreshing the background
   */
  function onGraphModified() {
    // updates the multi-line placement
    updateSubrows(true)
    // updates the lane height of each task
    updateTasks()

    // update the scrollable area of each component
    mainComponent.updateContentRect()
    taskComponent.updateContentRect()

    // trigger a background refresh
    mainComponent.backgroundGroup.dirty = true
    mainComponent.invalidate()
  }

  function createMainGraphComponent() {
    const graphComponent = new yfiles.view.GraphComponent('mainComponent')

    // switch of the horizontal scrollbar
    graphComponent.horizontalScrollBarPolicy = yfiles.view.ScrollBarVisibility.ALWAYS

    // switch off mouse wheel zoom
    graphComponent.mouseWheelBehavior = yfiles.view.MouseWheelBehaviors.SCROLL
    // disable animated scroll
    graphComponent.animateScrollCommands = false

    // install a viewport limiter so it's impossible to scroll out of the graph area
    graphComponent.viewportLimiter = new ViewportLimiter(taskComponent)
    // limit zoom to 1
    graphComponent.maximumZoom = 1
    graphComponent.minimumZoom = 1

    // add the background visualization to the component
    const gridVisual = new GridVisual(mapper, dataModel)
    graphComponent.backgroundGroup.addChild(
      gridVisual,
      yfiles.view.ICanvasObjectDescriptor.ALWAYS_DIRTY_INSTANCE
    )

    return graphComponent
  }

  function createTaskComponent() {
    const graphComponent = new yfiles.view.GraphComponent('taskComponent')
    // hide scrollbars
    graphComponent.verticalScrollBarPolicy = yfiles.view.ScrollBarVisibility.NEVER
    graphComponent.horizontalScrollBarPolicy = yfiles.view.ScrollBarVisibility.NEVER
    // switch off autodrag panning and mouse wheel zoom
    graphComponent.autoDrag = false
    graphComponent.mouseWheelBehavior = yfiles.view.MouseWheelBehaviors.NONE

    const labelModel = new yfiles.graph.InteriorStretchLabelModel({
      insets: new yfiles.geometry.Insets(10)
    })
    const nodeDefaults = graphComponent.graph.nodeDefaults
    nodeDefaults.labels.layoutParameter = labelModel.createParameter(
      yfiles.graph.InteriorStretchLabelModelPosition.CENTER
    )

    nodeDefaults.labels.style = new yfiles.styles.DefaultLabelStyle({
      verticalTextAlignment: yfiles.view.VerticalTextAlignment.CENTER,
      wrapping: yfiles.view.TextWrapping.WORD_ELLIPSIS,
      textFill: yfiles.view.Fill.WHITE
    })

    return graphComponent
  }

  function createTimelineGraphComponent() {
    const graphComponent = new yfiles.view.GraphComponent('timelineComponent')
    // hide scrollbars
    graphComponent.verticalScrollBarPolicy = yfiles.view.ScrollBarVisibility.NEVER
    graphComponent.horizontalScrollBarPolicy = yfiles.view.ScrollBarVisibility.NEVER
    // switch off autodrag panning and mouse wheel zoom
    graphComponent.autoDrag = false
    graphComponent.mouseWheelBehavior = yfiles.view.MouseWheelBehaviors.NONE

    // add the background visualization to the component
    const timelineVisual = new TimelineVisual(mapper)
    graphComponent.backgroundGroup.addChild(
      timelineVisual,
      yfiles.view.ICanvasObjectDescriptor.VISUAL
    )
    return graphComponent
  }

  // Start the demo
  run()
})
