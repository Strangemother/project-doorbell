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

define([
  'yfiles/view-layout-bridge',
  'yfiles/layout-hierarchic'
], /** @type {yfiles_namespace} */ /** typeof yfiles */ yfiles => {
  /**
   * Demonstrates how to realize a table node structure, i.e., each group node in the drawing represents a table
   * and the nodes within the groups the table rows. Edges are connected to specific rows.
   * The rows are sorted according to their y-coordinate in the initial drawing.
   */
  class TableLayout extends yfiles.layout.LayoutStageBase {
    /**
     * Creates a new instance of TableLayout.
     * @param {boolean} fromSketch
     */
    constructor(fromSketch) {
      super()

      // incremental hierarchic layout is used for the core layout that connects the table nodes
      const hierarchicLayout = new yfiles.hierarchic.HierarchicLayout()
      hierarchicLayout.layoutOrientation = yfiles.layout.LayoutOrientation.LEFT_TO_RIGHT
      hierarchicLayout.layoutMode = fromSketch
        ? yfiles.hierarchic.LayoutMode.INCREMENTAL
        : yfiles.hierarchic.LayoutMode.FROM_SCRATCH
      hierarchicLayout.orthogonalRouting = true

      // in case there are a lot of inter-edges, port optimization can take a while
      // then we want to take cut the calculation short and get a less optimized result
      hierarchicLayout.maximumDuration = 5000

      const recursiveGroupLayout = new yfiles.layout.RecursiveGroupLayout(hierarchicLayout)
      recursiveGroupLayout.autoAssignPortCandidates = true
      recursiveGroupLayout.fromSketchMode = true
      this.coreLayout = recursiveGroupLayout
    }

    /**
     * @param {yfiles.layout.LayoutGraph} graph
     */
    applyLayout(graph) {
      this.applyLayoutCore(graph)
    }

    /**
     * Gets the layout data that shall be used for the TableLayout.
     * @return {yfiles.layout.LayoutData}
     */
    static get LAYOUT_DATA() {
      if (!TableLayout.$layoutData) {
        // configure layout algorithms
        // used for laying out the nodes (rows) within the group nodes (tables)
        const rowLayout = new yfiles.layout.TabularLayout()
        rowLayout.layoutPolicy = yfiles.layout.TabularLayoutPolicy.FIXED_SIZE
        // keep the order of the nodes in the initial layout
        rowLayout.nodeComparer = new yfiles.collections.IComparer((n1, n2) => {
          const y1 = n1.graph.getCenter(n1).y
          const y2 = n2.graph.getCenter(n2).y
          if (y1 === y2) {
            return 0
          }
          return y1 > y2 ? 1 : -1
        })

        // use a grid with one column and a lot of rows. It must have enough cells for the nodes
        const grid = new yfiles.layout.PartitionGrid(1000, 1)
        grid.rows.forEach(row => {
          row.topInset = 2.5
          row.bottomInset = 2.5
        })
        const rowLayoutData = new yfiles.layout.TabularLayoutData()
        rowLayoutData.partitionGridData.grid = grid

        // set up port candidates for edges (edges should be attached to the left/right side of the corresponding node
        const candidates = yfiles.collections.List.fromArray([
          yfiles.layout.PortCandidate.createCandidate(yfiles.layout.PortDirections.WEST),
          yfiles.layout.PortCandidate.createCandidate(yfiles.layout.PortDirections.EAST)
        ])

        const recursiveGroupLayoutData = new yfiles.layout.RecursiveGroupLayoutData()
        recursiveGroupLayoutData.sourcePortCandidates.constant = candidates
        recursiveGroupLayoutData.targetPortCandidates.constant = candidates

        // map each group node to its corresponding layout algorithm;
        // in this case each group node shall be laid out using the row layout
        recursiveGroupLayoutData.groupNodeLayouts.constant = rowLayout

        // combine the layout data objects
        const layoutData = new yfiles.layout.CompositeLayoutData()
        layoutData.items = new yfiles.collections.List({
          items: [recursiveGroupLayoutData, rowLayoutData]
        })
        TableLayout.$layoutData = layoutData
      }
      return TableLayout.$layoutData
    }
  }

  return TableLayout
})
