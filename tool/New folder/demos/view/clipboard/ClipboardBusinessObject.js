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

define(['yfiles/view-component'], /** @type {yfiles_namespace} */ /** typeof yfiles */ yfiles => {
  let counter = 0

  /**
   * A data object with a name and a numeric value.
   */
  class ClipboardBusinessObject extends yfiles.lang.Class(yfiles.lang.IPropertyObservable) {
    /**
     * Creates a new instance of <code>ClipboardBusinessObject</code>
     */
    constructor() {
      super()
      this.$name = null
      this.$value = 0.5
      this.$propertyChangedEvent = null
    }

    /**
     * Gets the name of this object.
     * @return {string}
     */
    get name() {
      return this.$name
    }

    /**
     * Sets the name of this object.
     * @param {string} value
     */
    set name(value) {
      if (this.$name !== value) {
        this.$name = value
        if (this.$propertyChangedEvent !== null) {
          this.$propertyChangedEvent(this, new yfiles.lang.PropertyChangedEventArgs('name'))
        }
      }
    }

    /**
     * Gets the numeric value of this object.
     * @return {number}
     */
    get value() {
      return this.$value
    }

    /**
     * Sets the numeric value of this object.
     * @param {number} v
     */
    set value(v) {
      if (v < 0) {
        this.$value = 0
      } else if (v > 1) {
        this.$value = 1
      } else {
        this.$value = v
      }
    }

    /**
     * Gets the event fired when the {@link ClipboardBusinessObject#name} of this object changes.
     * @return {function(Object, yfiles.lang.PropertyChangedEventArgs)}
     */
    get propertyChangedEvent() {
      return this.$propertyChangedEvent
    }

    /**
     * Sets the event fired when the {@link ClipboardBusinessObject#name} of this object changes.
     * @param {function(Object, yfiles.lang.PropertyChangedEventArgs)} value
     */
    set propertyChangedEvent(value) {
      this.$propertyChangedEvent = value
    }

    /**
     * The event that is fired when the {@link ClipboardBusinessObject#name} of this object changes.
     * @param {function(Object, yfiles.lang.PropertyChangedEventArgs)} value
     */
    addPropertyChangedListener(value) {
      this.$propertyChangedEvent = yfiles.lang.delegate.combine(this.$propertyChangedEvent, value)
    }

    /**
     * The event that is fired when the {@link ClipboardBusinessObject#name} of this object changes.
     * @param {function(Object, yfiles.lang.PropertyChangedEventArgs)} value
     */
    removePropertyChangedListener(value) {
      this.$propertyChangedEvent = yfiles.lang.delegate.remove(this.$propertyChangedEvent, value)
    }

    /**
     * Creates an instance of ClipboardBusinessObject.
     * @return {ClipboardBusinessObject}
     */
    static create() {
      const newClipboardBusinessObject = new ClipboardBusinessObject()
      newClipboardBusinessObject.name = `Name ${++counter}`
      return newClipboardBusinessObject
    }
  }

  return ClipboardBusinessObject
})
